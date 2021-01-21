import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { useLessons } from '../../hooks/lessons';

import ReturnButton from '../../components/ReturnButton';

import {
  Container,
  Header,
  MainContent,
  MainScrollable,
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
  PlayButtonPressable,
} from './styles';

import logoImg from '../../assets/images/logo-small.png';

const LessonDetail: React.FC = () => {
  const { selectedLesson: lesson } = useLessons();
  const navigation = useNavigation();

  const handleNavigateToVideo = useCallback(() => {
    navigation.navigate('PlayVideo');
  }, [navigation]);

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
        <PlayButtonPressable onPress={handleNavigateToVideo}>
          <VideoPlaceholder
            source={{ uri: lesson.thumbnail_url }}
            resizeMode="cover"
            resizeMethod="resize"
          >
            <Feather name="play-circle" size={54} color="#fff" />
          </VideoPlaceholder>
        </PlayButtonPressable>

        <MainScrollable>
          <Title>{lesson.name}</Title>

          <InfoContainer>
            <Index>
              {`Aula ${lesson.lessonIndex.toString().padStart(2, '0')}`}
            </Index>

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
        </MainScrollable>
      </MainContent>
    </Container>
  );
};

export default LessonDetail;
