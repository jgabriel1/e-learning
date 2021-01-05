import React, { useMemo } from 'react';
import { ListRenderItem } from 'react-native';

import {
  Container,
  Header,
  Counter,
  Title,
  Content,
  EmptyView,
} from './styles';

interface Course {
  title: string;
  lessonsCount: number;
  imageURL: string;
}

export interface CourseListItem extends Course {
  isLast?: boolean;
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
  const coursesList = useMemo(() => {
    const list: CourseListItem[] = [...courses];

    if (courses.length % 2) {
      list.push({ title: '', lessonsCount: 0, imageURL: '', isLast: true });
    }

    return list;
  }, [courses]);

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
        data={coursesList}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index, separators }) =>
          !item?.isLast ? (
            renderItem({ item, index, separators })
          ) : (
            <EmptyView />
          )
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default CourseList;
