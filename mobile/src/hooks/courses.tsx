import React, { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';

import api from '../services/api';

/**
 * BACKEND TODO:
 * Change on the backend the names of the properties to match the client;
 */

interface ICourseResponseData {
  id: number;
  name: string;
  image: string;
  lessons_count: number;
}

interface ICourseData {
  id: number;
  title: string;
  lessonsCount: number;
  imageURL: string;
}

interface CoursesContextData {
  courses: ICourseData[];
}

const CoursesContext = createContext<CoursesContextData>(
  {} as CoursesContextData,
);

export const CoursesProvider: React.FC = ({ children }) => {
  const { data: courses } = useSWR<ICourseData[]>(
    'courses',
    async (url: string) => {
      const response = await api.get<ICourseResponseData[]>(url);

      return response.data.map(course => ({
        id: course.id,
        title: course.name,
        imageURL: course.image,
        lessonsCount: course.lessons_count,
      }));
    },
  );

  return (
    <CoursesContext.Provider
      value={{
        courses: courses || [],
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export function useCourses() {
  return useContext(CoursesContext);
}

export function useCourse(course_id: number) {
  const { courses } = useContext(CoursesContext);

  const course = useMemo(() => {
    return courses.find(_course => _course.id === course_id);
  }, [course_id, courses]);

  return course;
}
