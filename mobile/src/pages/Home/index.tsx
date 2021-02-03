import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useCourses } from '../../hooks/courses';

import SearchHeader from '../../components/SearchHeader';
import CourseList from '../../components/CourseList';
import CourseCard from '../../components/CourseCard';

import { Container } from './styles';

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

  return (
    <Container>
      <SearchHeader searchValueSetFunction={setFilterQuery} />

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
