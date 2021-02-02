import React, { useCallback, useEffect, useState } from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { Pressable } from './styles';
import { useFavoriteCourses } from '../../hooks/favorites';

interface FavoriteButtonProps {
  course_id: number;
  name: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ course_id, name }) => {
  const { checkFavorite, toggleFavorite } = useFavoriteCourses();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = useCallback(async () => {
    setIsFavorite(current => !current);

    await toggleFavorite({
      course_id,
      name,
    });
  }, [course_id, name, toggleFavorite]);

  useEffect(() => {
    checkFavorite(course_id).then(setIsFavorite);
  }, [checkFavorite, course_id]);

  return (
    <Pressable onPress={handleToggleFavorite}>
      {isFavorite ? (
        <Icon name="heart-multiple" size={24} color="#FF6680" />
      ) : (
        <Icon name="heart-multiple-outline" size={24} color="#FF6680" />
      )}
    </Pressable>
  );
};

export default FavoriteButton;
