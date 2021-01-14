import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useCourses } from '../../hooks/courses';

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
import { useLessons } from '../../hooks/lessons';

const Lessons: React.FC = () => {
  const { selectedCourse: course } = useCourses();
  const { courseLessons, setSelectedLesson } = useLessons();

  const navigation = useNavigation();

  const handleNavigateToLesson = useCallback(
    (lesson_id: number) => {
      setSelectedLesson(lesson_id);

      navigation.navigate('LessonDetail');
    },
    [navigation, setSelectedLesson],
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
          data={courseLessons}
          renderItem={({ item }) => (
            <LessonCard
              {...item}
              onPress={() => handleNavigateToLesson(item.id)}
            />
          )}
        />
      </LessonsList>
    </Container>
  );
};

export default Lessons;
