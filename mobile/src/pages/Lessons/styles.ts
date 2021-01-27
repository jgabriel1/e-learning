import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #6548a3;
`;

export const Header = styled.View`
  margin: 60px 24px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const LessonsList = styled.View`
  flex: 1;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #f0edf5;
`;

export const LessonsListHeader = styled.View`
  margin: 32px 24px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

export const LessonsListTitle = styled.Text`
  font-family: ${'rubik400'};
  font-size: 30px;
  color: #3d3d4c;
  flex: 1;
  max-height: 100px;
`;

export const LessonsListCounter = styled.Text`
  font-family: ${'roboto400'};
  font-size: 15px;
  line-height: 18px;
  color: #a0a0b2;
  text-align: right;
  margin-left: 8px;
`;

export const LessonsListContent = styled(
  FlatList as new () => FlatList<{
    id: number;
    name: string;
    lessonIndex: number;
    duration: number;
    isCompleted: boolean;
  }>,
).attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
})``;

export const EmptyView = styled.View``;
