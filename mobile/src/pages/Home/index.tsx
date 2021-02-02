import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useDebouncedCallback } from '../../utils/hooks/useDebouncedCallback';

import { useCourses } from '../../hooks/courses';

import FilterInput from '../../components/FilterInput';
import CourseList from '../../components/CourseList';
import CourseCard from '../../components/CourseCard';

import { Container, Header } from './styles';

import logoImg from '../../assets/images/logo-small.png';

const Home: React.FC = () => {
  const { courses, setSelectedCourseId, setFilterQuery } = useCourses();

  const navigation = useNavigation();

  const handleNavigateToCourse = useCallback(
    (course_id: number) => {
      setSelectedCourseId(course_id);

      navigation.navigate('LessonsStack', {
        screen: 'Lessons',
      });
    },
    [navigation, setSelectedCourseId],
  );

  const debouncedSetFilterQuery = useDebouncedCallback(
    (text: string) => {
      setFilterQuery(text);
    },
    [setFilterQuery],
  );

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <Feather name="power" color="#FF6680" size={24} />
      </Header>

      <FilterInput onChangeText={debouncedSetFilterQuery} />

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
