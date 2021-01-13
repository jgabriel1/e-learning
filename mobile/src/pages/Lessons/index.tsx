import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useCourseId } from '../../routes/lessons';
import { useCourse } from '../../hooks/courses';
import useCourseLessons from './useCourseLessons';

import ReturnButton from '../../components/ReturnButton';
import LessonCard from '../../components/LessonCard';

import {
  Container,
  Header,
  LessonsList,
  LessonsListCounter,
  LessonsListHeader,
  LessonsListTitle,
  LessonsListContent,
} from './styles';

import logoImg from '../../assets/images/logo-small.png';

const Lessons: React.FC = () => {
  const course_id = useCourseId();

  const course = useCourse(course_id);
  const { lessons } = useCourseLessons(course_id);

  const navigation = useNavigation();

  const handleNavigateToLesson = useCallback(
    (lesson_id: number) => {
      navigation.navigate('LessonDetail', {
        lesson_id,
      });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <ReturnButton />

        <Image source={logoImg} />

        <Feather name="heart" size={24} color="#FF6680" />
      </Header>

      <LessonsList>
        <LessonsListHeader>
          <LessonsListTitle>{course?.title || 'Curso'}</LessonsListTitle>
          <LessonsListCounter>{course?.lessonsCount || 0}</LessonsListCounter>
        </LessonsListHeader>

        <LessonsListContent
          keyExtractor={item => String(item.id)}
          data={lessons}
          renderItem={({ item, index }) => (
            <LessonCard
              {...item}
              onPress={() => handleNavigateToLesson(index)}
            />
          )}
        />
      </LessonsList>
    </Container>
  );
};

export default Lessons;
