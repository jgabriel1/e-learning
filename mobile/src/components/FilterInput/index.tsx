import React from 'react';
import { TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Container, Input } from './styles';

const FilterInput: React.ForwardRefRenderFunction<TextInput> = (props, ref) => {
  return (
    <Container>
      <Feather name="search" color="#C4C4D1" size={20} />

      <Input placeholder="Busque um curso" placeholderTextColor="#c4c4d1" />
    </Container>
  );
};

export default React.forwardRef(FilterInput);
