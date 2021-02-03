import React, { useCallback, useEffect } from 'react';
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
  ThumbnailPlaceholderBackground,
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
  DescriptionPlaceholderContainer,
  DescriptionPlaceholderText,
  EmptyView,
} from './styles';

import logoImg from '../../assets/images/logo-small.png';

const LessonDetail: React.FC = () => {
  const {
    selectedLesson: lesson,
    setNextLesson,
    setPreviousLesson,
  } = useLessons();

  const navigation = useNavigation();

  const handleNavigateToVideo = useCallback(() => {
    navigation.navigate('PlayVideo');
  }, [navigation]);

  const handleNavigateToPreviousLesson = useCallback(() => {
    setPreviousLesson();
  }, [setPreviousLesson]);

  const handleNavigateToNextLesson = useCallback(() => {
    setNextLesson();
  }, [setNextLesson]);

  useEffect(() => {
    if (!lesson) {
      navigation.navigate('Lessons');
    }
  }, [lesson, navigation]);

  if (!lesson) {
    return null;
  }

  return (
    <Container>
      <Header>
        <ReturnButton />

        <Image source={logoImg} />

        <EmptyView />
      </Header>

      <MainContent>
        {lesson.thumbnail_url ? (
          <PlayButtonPressable onPress={handleNavigateToVideo}>
            <VideoPlaceholder
              source={{ uri: lesson.thumbnail_url }}
              resizeMode="cover"
              resizeMethod="resize"
            >
              <Feather name="play-circle" size={54} color="#fff" />
            </VideoPlaceholder>
          </PlayButtonPressable>
        ) : (
          <ThumbnailPlaceholderBackground>
            <Feather name="play-circle" size={54} color="#fff" />
          </ThumbnailPlaceholderBackground>
        )}

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

          {!lesson.description ? (
            <DescriptionPlaceholderContainer>
              <DescriptionPlaceholderText>
                Carregando descrição...
              </DescriptionPlaceholderText>
            </DescriptionPlaceholderContainer>
          ) : (
            <>
              <Description>{lesson.description}</Description>

              <BottomButtonsContainer>
                <PreviousLessonButton onPress={handleNavigateToPreviousLesson}>
                  <Feather name="arrow-left" color="#ff6680" size={20} />

                  <PreviousLessonButtonText>Anterior</PreviousLessonButtonText>
                </PreviousLessonButton>

                <NextLessonButton onPress={handleNavigateToNextLesson}>
                  <NextLessonButtonText>Próxima</NextLessonButtonText>

                  <Feather name="arrow-right" color="#ffffff" size={20} />
                </NextLessonButton>
              </BottomButtonsContainer>
            </>
          )}
        </MainScrollable>
      </MainContent>
    </Container>
  );
};

export default LessonDetail;
