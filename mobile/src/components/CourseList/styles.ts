import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { CourseListItem } from '.';

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
  color: #3d3d4c;
  font-size: 20px;
`;

export const Counter = styled.Text`
  color: #a0a0b2;
  font-size: 15px;
`;

export const Content = styled(
  FlatList as new () => FlatList<CourseListItem>,
).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
})``;

export const EmptyView = styled.View`
  height: 172px;
  border-radius: 16px;
  margin: 0 8px 18px 8px;
  flex-grow: 1;
  flex-basis: 0;
`;
