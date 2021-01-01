import React from 'react';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  GreenPlayIconContainer,
  RedPlayIconContainer,
  MainContainer,
  TitleContainer,
  Title,
  BottomContainer,
  InfoContainer,
  LessonNumber,
  LessonDurationContainer,
  LessonDurationText,
  CompletedContainer,
  CompletedText,
} from './styles';

const LessonCard = () => {
  const completed = true;

  return (
    <Container>
      <MainContainer>
        <TitleContainer>
          <Title>Introdução à teoria matemática</Title>
        </TitleContainer>

        <BottomContainer>
          <InfoContainer>
            <LessonNumber>Aula 01</LessonNumber>

            <LessonDurationContainer>
              <Feather name="clock" size={12} color="#C4C4D1" />
              <LessonDurationText>5 min</LessonDurationText>
            </LessonDurationContainer>
          </InfoContainer>

          {completed && (
            <CompletedContainer>
              <CompletedText>Completo!</CompletedText>
            </CompletedContainer>
          )}
        </BottomContainer>
      </MainContainer>

      {completed ? (
        <GreenPlayIconContainer>
          <Feather name="play-circle" size={34} color="#fff" />
        </GreenPlayIconContainer>
      ) : (
        <RedPlayIconContainer>
          <Feather name="play-circle" size={34} color="#fff" />
        </RedPlayIconContainer>
      )}
    </Container>
  );
};

export default LessonCard;
