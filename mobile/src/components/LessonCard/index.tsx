import React from 'react';
import { Pressable } from 'react-native';
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

interface LessonCardProps {
  name: string;
  lessonIndex: number;
  duration: number;
  isCompleted: boolean;
  onPress?: () => void | Promise<void>;
}

const LessonCard: React.FC<LessonCardProps> = ({
  name,
  lessonIndex,
  duration,
  isCompleted,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Container>
        <MainContainer>
          <TitleContainer>
            <Title>{name}</Title>
          </TitleContainer>

          <BottomContainer>
            <InfoContainer>
              <LessonNumber>
                {`Aula ${(lessonIndex || 0).toString().padStart(2, '0')}`}
              </LessonNumber>

              <LessonDurationContainer>
                <Feather name="clock" size={12} color="#C4C4D1" />

                <LessonDurationText>
                  {`${duration || 0} min`}
                </LessonDurationText>
              </LessonDurationContainer>
            </InfoContainer>

            {isCompleted && (
              <CompletedContainer>
                <CompletedText>Completo!</CompletedText>
              </CompletedContainer>
            )}
          </BottomContainer>
        </MainContainer>

        {isCompleted ? (
          <GreenPlayIconContainer>
            <Feather name="play-circle" size={34} color="#fff" />
          </GreenPlayIconContainer>
        ) : (
          <RedPlayIconContainer>
            <Feather name="play-circle" size={34} color="#fff" />
          </RedPlayIconContainer>
        )}
      </Container>
    </Pressable>
  );
};

export default LessonCard;
