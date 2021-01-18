import React from 'react';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  PlayIconContainer,
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
            <Title
              ellipsizeMode="tail"
              adjustsFontSizeToFit
              minimumFontScale={0.9}
              numberOfLines={2}
            >
              {name}
            </Title>
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

        <PlayIconContainer isCompleted={isCompleted}>
          <Feather name="play-circle" size={34} color="#fff" />
        </PlayIconContainer>
      </Container>
    </Pressable>
  );
};

export default LessonCard;
