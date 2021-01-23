import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { Course } from '.';

export const Container = styled.View`
  flex: 1;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #f0edf5;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 24px;
`;

export const Title = styled.Text`
  font-family: ${'rubik400'};
  color: #3d3d4c;
  font-size: 20px;
`;

export const Counter = styled.Text`
  font-family: ${'roboto400'};
  color: #a0a0b2;
  font-size: 15px;
`;

export const Content = styled(FlatList as new () => FlatList<Course>).attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
})``;
