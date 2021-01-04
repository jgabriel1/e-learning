import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import CourseList from '../../components/CourseList';
import CourseCard from '../../components/CourseCard';

import { Container, Header, SearchInput, SearchInputContainer } from './styles';

import logoImg from '../../assets/images/logo-small.png';

const MyCourses: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToCourse = useCallback(
    (course_id: number) => {
      navigation.navigate('LessonsStack', {
        screen: 'Lessons',
        params: { course_id },
      });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <Feather name="power" color="#FF6680" size={24} />
      </Header>

      <SearchInputContainer>
        <Feather name="search" color="#C4C4D1" size={20} />
        <SearchInput
          placeholder="Busque um curso"
          placeholderTextColor="#c4c4d1"
        />
      </SearchInputContainer>

      <CourseList
        courses={[]}
        title="Cursos Favoritos"
        renderItem={({ item, index }) => (
          <CourseCard {...item} onPress={() => handleNavigateToCourse(index)} />
        )}
      />
    </Container>
  );
};

export default MyCourses;
