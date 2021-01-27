import React, { createContext, useCallback, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import useSWR from 'swr';

import api from '../services/api';
import { useDatabaseConnection } from './database';
import { FavoriteCoursesRepository } from '../services/database/repositories/FavoriteCoursesRepository';

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
  favoriteCoursesIds: Set<number>;
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

      const favoritesIds = new Set(
        favorites.map(favorite => favorite.course_id),
      );

      console.log('loaded favorites');

      return favoritesIds;
    },
  );

  const { data: favoriteCourses } = useSWR<ICourseData[]>(
    favoriteCoursesIds ? ['courses/list', favoriteCoursesIds] : null,
    async (url: string, course_ids: Set<number>) => {
      const ids = Array.from(course_ids);

      const response = await api.post<ICourseResponseData[]>(url, {
        courses: ids,
      });

      console.log('fetched favorites data');

      return response.data.map(course => ({
        id: course.id,
        title: course.name,
        imageURL: course.image,
        lessonsCount: course.lessons_count,
      }));
    },
  );

  const checkFavorite = useCallback(
    async (course_id: number) => {
      if (favoriteCoursesIds) {
        return !!favoriteCoursesIds?.has(course_id);
      }

      return favoritesRepository.existsByCourseId(course_id);
    },
    [favoriteCoursesIds, favoritesRepository],
  );

  const toggleFavorite = useCallback(
    async (course_id: number) => {
      const favoritesState = new Set(favoriteCoursesIds);

      const isFavorite = await checkFavorite(course_id);

      if (!isFavorite) {
        await favoritesRepository.create(course_id);

        favoritesState.add(course_id);
      } else {
        await favoritesRepository.delete(course_id);

        favoritesState.delete(course_id);
      }

      mutateFavoritesIds(favoritesState, true);
    },
    [
      checkFavorite,
      favoriteCoursesIds,
      favoritesRepository,
      mutateFavoritesIds,
    ],
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
        favoriteCoursesIds: favoriteCoursesIds || new Set(),
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
