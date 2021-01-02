import React from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

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

const LessonDetail: React.FC = () => {
  return (
    <Container>
      <Header>
        <Feather name="arrow-left" size={24} color="#FF6680" />

        <Image source={logoImg} />

        <Feather name="heart" size={24} color="#FF6680" />
      </Header>

      <MainContent>
        <VideoPlaceholder>
          <Feather name="play-circle" size={54} color="#fff" />
        </VideoPlaceholder>

        <Title>Introdução à teoria matemática</Title>

        <InfoContainer>
          <Index>Aula 01</Index>

          <DurationContainer>
            <Feather name="clock" size={12} color="#a0a0b2" />

            <DurationText>5 min</DurationText>
          </DurationContainer>
        </InfoContainer>

        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi laoreet
          a sapien at dapibus. Quisque hendrerit blandit tellus, aliquet
          vehicula ligula ultricies vitae. Nam at diam at nulla iaculis gravida
          quis ut ipsum. Pellentesque tincidunt risus vitae faucibus rutrum.
          Mauris arcu libero, blandit et vestibulum eu, semper vel eros.
        </Description>

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
