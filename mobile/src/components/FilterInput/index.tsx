import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, Input } from './styles';

const FilterInput: React.ForwardRefRenderFunction<TextInput, TextInputProps> = (
  props,
  ref,
) => {
  return (
    <Container>
      <Feather name="search" color="#C4C4D1" size={20} />

      <Input
        ref={ref}
        {...props}
        placeholder="Busque um curso"
        placeholderTextColor="#c4c4d1"
      />
    </Container>
  );
};

export default React.forwardRef(FilterInput);
