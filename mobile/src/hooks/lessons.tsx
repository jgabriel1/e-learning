import React, { createContext, useContext, useMemo, useState } from 'react';
import useSWR from 'swr';

import api from '../services/api';
import { useCourses } from './courses';

/**
 * TODO BACKEND:
 * Add lesson index in the backend, the order could change within the database.
 */

interface ILessonResponseData {
  id: number;
  name: string;
  duration: number;
  description: string;
  video_id: string;
}

interface ILessonData {
  id: number;
  name: string;
  duration: number;
  description: string;
  lessonIndex: number;
  isCompleted: boolean;
  videoId: string;
}

interface LessonsContextData {
  courseLessons: ILessonData[];
  selectedLesson: ILessonData | null;
  setSelectedLesson: (lesson_id: number) => void;
}

const LessonsContext = createContext<LessonsContextData>(
  {} as LessonsContextData,
);

export const LessonsProvider: React.FC = ({ children }) => {
  const { selectedCourse: course } = useCourses();

  const [selectedLessonId, setSelectedLesson] = useState<number | null>(null);

  const { data: lessons } = useSWR(
    course ? `courses/${course.id}/lessons` : null,
    async (url: string) => {
      const response = await api.get<ILessonResponseData[]>(url);

      return response.data.map((lesson, index) => {
        return {
          id: lesson.id,
          name: lesson.name,
          duration: lesson.duration,
          description: lesson.description,
          lessonIndex: index + 1,
          isCompleted: false,
          videoId: lesson.video_id,
        };
      });
    },
  );

  const selectedLesson = useMemo(() => {
    if (!selectedLessonId || !lessons) {
      return null;
    }

    return lessons.find(lesson => lesson.id === selectedLessonId) || null;
  }, [lessons, selectedLessonId]);

  return (
    <LessonsContext.Provider
      value={{
        courseLessons: lessons || [],
        selectedLesson,
        setSelectedLesson,
      }}
    >
      {children}
    </LessonsContext.Provider>
  );
};

export function useLessons() {
  return useContext(LessonsContext);
}
