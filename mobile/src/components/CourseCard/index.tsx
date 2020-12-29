import React from 'react';

import {
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
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  lessonsCount,
  imageURL,
}) => {
  return (
    <Container>
      <CourseImage source={{ uri: imageURL }} />

      <InfoContainer>
        <Title>{title}</Title>

        <LessonsCount>{lessonsCount} Aulas</LessonsCount>
      </InfoContainer>
    </Container>
  );
};

export default CourseCard;
