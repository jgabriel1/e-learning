import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { View, Text } from 'react-native';
import useSWR from 'swr';

import { useDatabaseConnection } from './database';

import { FavoriteCoursesRepository } from '../services/database/repositories/FavoriteCoursesRepository';
import api from '../services/api';

interface ICourseResponseData {
  id: number;
  name: string;
  image: string;
  lessons_count: number;
}

interface ICourseData {
  id: number;
  title: string;
  lessonsCount: number;
  imageURL: string;
}

interface FavoritesContextData {
  favoriteCoursesIds: number[];
  favoriteCourses: ICourseData[];
  loadFavorites: () => void;
  checkFavorite: (course_id: number) => Promise<boolean>;
  toggleFavorite: (course_id: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

export const FavoritesProvider: React.FC = ({ children }) => {
  const { connection } = useDatabaseConnection();

  const favoritesRepository = useMemo(() => {
    return new FavoriteCoursesRepository(connection);
  }, [connection]);

  const [shouldLoadfavorites, setShouldLoadFavorites] = useState(false);

  const loadFavorites = useCallback(() => {
    setShouldLoadFavorites(true);
  }, []);

  const { data: favoriteCoursesIds, mutate: mutateFavoritesIds } = useSWR(
    shouldLoadfavorites ? 'database/favorite-courses' : null,
    async () => {
      const favorites = await favoritesRepository.listAll();

      const favoritesIds = favorites.map(favorite => favorite.course_id);

      return favoritesIds;
    },
  );

  const { data: favoriteCourses } = useSWR<ICourseData[]>(
    favoriteCoursesIds ? ['courses/list', favoriteCoursesIds] : null,
    async (url: string, course_ids: Set<number>) => {
      const response = await api.post<ICourseResponseData[]>(url, {
        courses: course_ids,
      });

      return response.data.map(course => ({
        id: course.id,
        title: course.name,
        imageURL: course.image,
        lessonsCount: course.lessons_count,
      }));
    },
    {},
  );

  const checkFavorite = useCallback(
    async (course_id: number) => {
      if (favoriteCoursesIds) {
        return !!favoriteCoursesIds?.includes(course_id);
      }

      return favoritesRepository.existsByCourseId(course_id);
    },
    [favoriteCoursesIds, favoritesRepository],
  );

  const toggleFavorite = useCallback(
    async (course_id: number) => {
      const isFavorite = await checkFavorite(course_id);

      if (!isFavorite) {
        await favoritesRepository.create(course_id);

        mutateFavoritesIds(current => current && [...current, course_id]);
      } else {
        await favoritesRepository.delete(course_id);

        mutateFavoritesIds(
          current => current && current.filter(id => id !== course_id),
        );
      }
    },
    [checkFavorite, favoritesRepository, mutateFavoritesIds],
  );

  if (shouldLoadfavorites && !favoriteCoursesIds) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'roboto500', fontSize: 20 }}>
          Loading favorites...
        </Text>
      </View>
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCoursesIds: favoriteCoursesIds || [],
        favoriteCourses: favoriteCourses || [],
        loadFavorites,
        checkFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavoriteCourses() {
  return useContext(FavoritesContext);
}
