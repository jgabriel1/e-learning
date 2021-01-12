import React from 'react';

import {
  Pressable,
  Container,
  Title,
  LessonsCount,
  InfoContainer,
  CourseImage,
} from './styles';

/**
 * TODO:
 * Modify items to be only one per row. Since course names are too long, it gets
 * too cluttered to have two courses per row.
 */

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
