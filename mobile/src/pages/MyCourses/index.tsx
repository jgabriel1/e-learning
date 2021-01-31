import React, { useCallback, useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useCourses } from '../../hooks/courses';
import { useFavoriteCourses } from '../../hooks/favorites';

import FilterInput from '../../components/FilterInput';
import CourseList from '../../components/CourseList';
import CourseCard from '../../components/CourseCard';

import { Container, Header } from './styles';

import logoImg from '../../assets/images/logo-small.png';

const MyCourses: React.FC = () => {
  const { setSelectedCourseId } = useCourses();
  const { favoriteCourses, loadFavorites } = useFavoriteCourses();

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
      <Header>
        <Image source={logoImg} />
        <Feather name="power" color="#FF6680" size={24} />
      </Header>

      <FilterInput />

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
