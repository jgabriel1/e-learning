import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useCourses } from '../../hooks/courses';
import { useFavoriteCourses } from '../../hooks/favorites';

import SearchHeader from '../../components/SearchHeader';
import CourseList from '../../components/CourseList';
import CourseCard from '../../components/CourseCard';

import { Container } from './styles';

const MyCourses: React.FC = () => {
  const { setSelectedCourseId } = useCourses();
  const {
    favoriteCourses,
    loadFavorites,
    setFilterQuery,
  } = useFavoriteCourses();

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

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <Container>
      <SearchHeader searchValueSetFunction={setFilterQuery} />

      <CourseList
        courses={favoriteCourses}
        title="Cursos Favoritos"
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

export default MyCourses;
