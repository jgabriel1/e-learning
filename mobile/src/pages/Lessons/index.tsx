import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

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
          <LessonsListTitle>Matemática</LessonsListTitle>
          <LessonsListCounter>16 aulas</LessonsListCounter>
        </LessonsListHeader>

        <LessonsListContent
          keyExtractor={(_, index) => String(index)}
          data={[
            {
              name: 'Introdução à teoria matemática',
              duration: 25,
              lessonIndex: 1,
              isCompleted: true,
            },
            {
              name: 'Introdução à teoria matemática',
              duration: 25,
              lessonIndex: 2,
              isCompleted: false,
            },
          ]}
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
