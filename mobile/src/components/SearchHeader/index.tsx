import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useDebouncedCallback } from '../../utils/hooks/useDebouncedCallback';

import {
  Container,
  ToggleButtonPressable,
  SearchInput,
  SearchInputContainer,
} from './styles';

import logoImg from '../../assets/images/logo-small.png';

interface SearchHeaderProps {
  searchValueSetFunction: (text: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchValueSetFunction,
}) => {
  const [isSearchInputActive, setSearchInputActivity] = useState(false);

  const handleToggleSearchInput = useCallback(() => {
    setSearchInputActivity(current => !current);
  }, []);

  const debouncedSearchValueSetFunction = useDebouncedCallback(
    (text: string) => {
      searchValueSetFunction(text);
    },
    [searchValueSetFunction],
  );

  useEffect(() => {
    if (!isSearchInputActive) {
      searchValueSetFunction('');
    }
  }, [isSearchInputActive, searchValueSetFunction]);

  return (
    <>
      <Container>
        <Image source={logoImg} />

        <ToggleButtonPressable onPress={handleToggleSearchInput}>
          {isSearchInputActive ? (
            <Feather name="x" size={24} color="#FF6680" />
          ) : (
            <Feather name="search" size={24} color="#FF6680" />
          )}
        </ToggleButtonPressable>
      </Container>

      {isSearchInputActive && (
        <SearchInputContainer>
          <Feather name="search" color="#C4C4D1" size={20} />

          <SearchInput
            onChangeText={debouncedSearchValueSetFunction}
            placeholder="Busque um curso"
            placeholderTextColor="#c4c4d1"
          />
        </SearchInputContainer>
      )}
    </>
  );
};

export default SearchHeader;
