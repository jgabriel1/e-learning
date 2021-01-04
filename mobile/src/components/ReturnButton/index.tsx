import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Pressable } from './styles';

const ReturnButton: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Pressable onPress={handleGoBack}>
      <Feather name="arrow-left" size={24} color="#FF6680" />
    </Pressable>
  );
};

export default ReturnButton;
