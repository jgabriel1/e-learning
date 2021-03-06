import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useCourses } from '../../hooks/courses';
import { useLessons } from '../../hooks/lessons';
import { useLessonsProgress } from '../../hooks/progress';

import ReturnButton from '../../components/ReturnButton';
import FavoriteButton from '../../components/FavoriteButton';
import LessonCard from '../../components/LessonCard';

import {
  Container,
  Header,
  LessonsList,
  LessonsListCounter,
  LessonsListHeader,
  LessonsListTitle,
  LessonsListContent,
  EmptyView,
} from './styles';

import logoImg from '../../assets/images/logo-small.png';

const Lessons: React.FC = () => {
  const { selectedCourse: course } = useCourses();
  const { courseLessons, setSelectedLesson } = useLessons();
  const { completedLessonIndexes } = useLessonsProgress();

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

        {course ? (
          <FavoriteButton course_id={course?.id} name={course.title} />
        ) : (
          <EmptyView />
        )}
      </Header>

      <LessonsList>
        <LessonsListHeader>
          <LessonsListTitle
            ellipsizeMode="tail"
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            numberOfLines={3}
          >
            {course?.title || 'Curso'}
          </LessonsListTitle>

          <LessonsListCounter>
            {`${course?.lessonsCount || 0} aulas`}
          </LessonsListCounter>
        </LessonsListHeader>

        <LessonsListContent
          keyExtractor={item => String(item.id)}
          data={courseLessons}
          renderItem={({ item }) => {
            const isCompleted = completedLessonIndexes.has(item.lessonIndex);

            return (
              <LessonCard
                {...item}
                isCompleted={isCompleted}
                onPress={() => handleNavigateToLesson(item.id)}
              />
            );
          }}
        />
      </LessonsList>
    </Container>
  );
};

export default Lessons;
