import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useCourses } from '../../hooks/courses';

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

        {course ? <FavoriteButton course_id={course?.id} /> : <EmptyView />}
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
