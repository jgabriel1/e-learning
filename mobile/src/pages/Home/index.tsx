import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useCourses } from '../../hooks/courses';

import CourseList from '../../components/CourseList';
import CourseCard from '../../components/CourseCard';

import { Container, Header, SearchInputContainer, SearchInput } from './styles';

import logoImg from '../../assets/images/logo-small.png';

const Home: React.FC = () => {
  const { courses } = useCourses();

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
        courses={courses}
        title="Categorias"
        renderItem={({ item }) => (
          <CourseCard
            {...item}
            onPress={() => handleNavigateToCourse(item.id)}
          />
        )}
      />
    </Container>
  );
};

export default Home;
