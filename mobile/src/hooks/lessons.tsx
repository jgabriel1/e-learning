import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useSWR from 'swr';

import api from '../services/api';
import { useCourses } from './courses';

interface ILessonResponseData {
  id: number;
  name: string;
  duration: number;
  description: string;
  video_id: string;
  thumbnail_url: string;
  lesson_index: number;
}

interface ILessonData {
  id: number;
  name: string;
  duration: number;
  description: string;
  lessonIndex: number;
  thumbnail_url: string;
  isCompleted: boolean;
  videoId: string;
}

interface LessonsContextData {
  courseLessons: ILessonData[];
  selectedLesson: ILessonData | null;
  setSelectedLesson: (lesson_id: number) => void;
  setNextLesson: () => void;
  setPreviousLesson: () => void;
}

const LessonsContext = createContext<LessonsContextData>(
  {} as LessonsContextData,
);

export const LessonsProvider: React.FC = ({ children }) => {
  const { selectedCourse: course } = useCourses();

  const { data: lessons } = useSWR(
    course ? `courses/${course.id}/lessons` : null,
    async (url: string) => {
      const response = await api.get<ILessonResponseData[]>(url);

      return response.data.map(lesson => {
        return {
          id: lesson.id,
          name: lesson.name,
          duration: lesson.duration,
          description: lesson.description,
          lessonIndex: lesson.lesson_index,
          videoId: lesson.video_id,
          thumbnail_url: lesson.thumbnail_url,
          isCompleted: false,
        };
      });
    },
  );

  const [selectedLessonId, setSelectedLesson] = useState<number | null>(null);

  const selectedLesson = useMemo(() => {
    if (!selectedLessonId || !lessons) {
      return null;
    }

    return lessons.find(lesson => lesson.id === selectedLessonId) || null;
  }, [lessons, selectedLessonId]);

  const setNextLesson = useCallback(() => {
    setSelectedLesson(() => {
      if (!selectedLesson) {
        return null;
      }

      const nextLesson = lessons?.find(
        lesson => lesson.lessonIndex === selectedLesson.lessonIndex + 1,
      );

      return nextLesson?.id || null;
    });
  }, [lessons, selectedLesson]);

  const setPreviousLesson = useCallback(() => {
    setSelectedLesson(() => {
      if (!selectedLesson) {
        return null;
      }

      const nextLesson = lessons?.find(
        lesson => lesson.lessonIndex === selectedLesson.lessonIndex - 1,
      );

      return nextLesson?.id || null;
    });
  }, [lessons, selectedLesson]);

  return (
    <LessonsContext.Provider
      value={{
        courseLessons: lessons || [],
        selectedLesson,
        setSelectedLesson,
        setPreviousLesson,
        setNextLesson,
      }}
    >
      {children}
    </LessonsContext.Provider>
  );
};

export function useLessons() {
  return useContext(LessonsContext);
}
