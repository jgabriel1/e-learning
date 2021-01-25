import React, { createContext, useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import useSWR from 'swr';

import { useDatabaseConnection } from './database';
import { FavoriteCoursesRepository } from '../services/database/repositories/FavoriteCoursesRepository';

interface FavoritesContextData {
  favoriteCoursesIds: Set<number>;
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

  const { data: favoriteCoursesIds, mutate: mutateFavorites } = useSWR(
    'database/favorite-courses',
    async () => {
      const favorites = await favoritesRepository.listAll();

      const favoritesIds = new Set(
        favorites.map(favorite => favorite.course_id),
      );

      console.log('loaded favorites');

      return favoritesIds;
    },
    {
      initialData: new Set(),
    },
  );

  const checkFavorite = useCallback(
    async (course_id: number) => {
      const isInFavorites = favoriteCoursesIds?.has(course_id);

      return !!isInFavorites;
    },
    [favoriteCoursesIds],
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
      value={{ favoriteCoursesIds, checkFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
