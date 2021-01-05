import React from 'react';

import {
  Pressable,
  Container,
  Title,
  LessonsCount,
  InfoContainer,
  CourseImage,
} from './styles';

interface CourseCardProps {
  title: string;
  lessonsCount: number;
  imageURL: string;
  onPress: () => void | Promise<void>;
  onLongPress?: () => void | Promise<void>;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  lessonsCount,
  imageURL,
  onPress,
  onLongPress,
}) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <Container>
        <CourseImage source={{ uri: imageURL }} />

        <InfoContainer>
          <Title>{title}</Title>

          <LessonsCount>{lessonsCount} Aulas</LessonsCount>
        </InfoContainer>
      </Container>
    </Pressable>
  );
};

export default CourseCard;
