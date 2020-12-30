import { FlatList } from 'react-native';
import styled from 'styled-components/native';

interface CourseProps {
  title: string;
  lessonsCount: number;
  imageURL: string;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #6548a3;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 60px 24px 24px;
`;

export const SearchInputContainer = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
  height: 56px;
  padding: 0 24px;
  margin: 0 20px 32px;
`;

export const SearchInput = styled.TextInput`
  color: #3d3d4c;
  margin-left: 16px;
  font-size: 15px;
  line-height: 18px;
`;

export const CoursesList = styled.View`
  flex: 1;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #f0edf5;
`;

export const CoursesListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 24px;
`;

export const CoursesListTitle = styled.Text`
  color: #3d3d4c;
  font-size: 20px;
`;

export const CoursesListCounter = styled.Text`
  color: #a0a0b2;
  font-size: 15px;
`;

export const CoursesListContent = styled(
  FlatList as new () => FlatList<CourseProps>,
).attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
})``;
