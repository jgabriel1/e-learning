import React from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import ReturnButton from '../../components/ReturnButton';

import {
  Container,
  Header,
  MainContent,
  VideoPlaceholder,
  Title,
  InfoContainer,
  Index,
  DurationContainer,
  DurationText,
  Description,
  BottomButtonsContainer,
  PreviousLessonButton,
  PreviousLessonButtonText,
  NextLessonButton,
  NextLessonButtonText,
} from './styles';

import logoImg from '../../assets/images/logo-small.png';
import { useLessons } from '../../hooks/lessons';

const LessonDetail: React.FC = () => {
  const { selectedLesson: lesson } = useLessons();

  if (!lesson) {
    return null;
  }

  return (
    <Container>
      <Header>
        <ReturnButton />

        <Image source={logoImg} />

        <Feather name="heart" size={24} color="#FF6680" />
      </Header>

      <MainContent>
        <VideoPlaceholder>
          <Feather name="play-circle" size={54} color="#fff" />
        </VideoPlaceholder>

        <Title>{lesson.name}</Title>

        <InfoContainer>
          <Index>Aula 01</Index>

          <DurationContainer>
            <Feather name="clock" size={16} color="#a0a0b2" />

            <DurationText>{`${lesson.duration} min`}</DurationText>
          </DurationContainer>
        </InfoContainer>

        <Description>{lesson.description}</Description>

        <BottomButtonsContainer>
          <PreviousLessonButton>
            <Feather name="arrow-left" color="#ff6680" size={20} />

            <PreviousLessonButtonText>Aula anterior</PreviousLessonButtonText>
          </PreviousLessonButton>

          <NextLessonButton>
            <NextLessonButtonText>Próxima aula</NextLessonButtonText>

            <Feather name="arrow-right" color="#ffffff" size={20} />
          </NextLessonButton>
        </BottomButtonsContainer>
      </MainContent>
    </Container>
  );
};

export default LessonDetail;
