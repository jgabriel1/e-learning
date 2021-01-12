import React, { useMemo } from 'react';
import { ListRenderItem } from 'react-native';

import { Container, Header, Counter, Title, Content } from './styles';

export interface Course {
  title: string;
  lessonsCount: number;
  imageURL: string;
}

interface CourseListProps {
  title: string;
  courses: Course[];
  renderItem: ListRenderItem<Course>;
}

const CourseList: React.FC<CourseListProps> = ({
  title,
  courses,
  renderItem,
}) => {
  const coursesCount = useMemo(() => {
    const { length } = courses;

    return `${length} ${length === 1 ? 'curso' : 'cursos'}`;
  }, [courses]);

  return (
    <Container>
      <Header>
        <Title>{title}</Title>

        <Counter>{coursesCount}</Counter>
      </Header>

      <Content
        data={courses}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default CourseList;
