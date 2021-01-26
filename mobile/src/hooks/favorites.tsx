import React, { createContext, useCallback, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import useSWR from 'swr';

import { useDatabaseConnection } from './database';
import { FavoriteCoursesRepository } from '../services/database/repositories/FavoriteCoursesRepository';

interface FavoritesContextData {
  favoriteCoursesIds: Set<number>;
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

  const { data: favoriteCoursesIds, mutate: mutateFavorites } = useSWR(
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

      mutateFavorites(favoritesState, true);
    },
    [checkFavorite, favoriteCoursesIds, favoritesRepository, mutateFavorites],
  );

  if (!favoriteCoursesIds) {
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
        favoriteCoursesIds,
        loadFavorites,
        checkFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
