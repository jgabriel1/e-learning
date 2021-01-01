import React from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

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
  return (
    <Container>
      <Header>
        <Feather name="arrow-left" size={24} color="#FF6680" />

        <Image source={logoImg} />

        <Feather name="heart" size={24} color="#FF6680" />
      </Header>

      <LessonsList>
        <LessonsListHeader>
          <LessonsListTitle>Matemática</LessonsListTitle>
          <LessonsListCounter>16 aulas</LessonsListCounter>
        </LessonsListHeader>

        <LessonsListContent
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
          renderItem={({ item }) => <LessonCard {...item} />}
        />
      </LessonsList>
    </Container>
  );
};

export default Lessons;
