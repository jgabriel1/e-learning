import React from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  LessonsList,
  LessonsListCounter,
  LessonsListHeader,
  LessonsListTitle,
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
      </LessonsList>
    </Container>
  );
};

export default Lessons;
