import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
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
  selectedCourse: ICourseData | null;
  setSelectedCourseId: (course_id: number) => void;
  resetSelectedCourse: () => void;
}

const CoursesContext = createContext<CoursesContextData>(
  {} as CoursesContextData,
);

export const CoursesProvider: React.FC = ({ children }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

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

  const resetSelectedCourse = useCallback(() => {
    setSelectedCourseId(null);
  }, []);

  const selectedCourse = useMemo(() => {
    if (!courses || !selectedCourseId) {
      return null;
    }

    return courses.find(course => course.id === selectedCourseId) || null;
  }, [courses, selectedCourseId]);

  return (
    <CoursesContext.Provider
      value={{
        courses: courses || [],
        selectedCourse,
        setSelectedCourseId,
        resetSelectedCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export function useCourses() {
  return useContext(CoursesContext);
}
