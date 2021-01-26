import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useSWR from 'swr';
import { CourseProgressRepository } from '../services/database/repositories/CourseProgressRepository';
import { useDatabaseConnection } from './database';

interface CompleteLessonData {
  lesson_id: number;
  course_lesson_index: number;
}

interface ProgressContextData {
  completedLessonIndexes: Set<number>;
  setSelectedCourse: (course_id: number) => void;
  resetSelectedCourse: () => void;
  completeLesson: (data: CompleteLessonData) => Promise<void>;
}

const ProgressContext = createContext({} as ProgressContextData);

export const ProgressProvider: React.FC = ({ children }) => {
  const { connection } = useDatabaseConnection();

  const progressRepository = useMemo(() => {
    return new CourseProgressRepository(connection);
  }, [connection]);

  const [selectedCourseId, setSelectedCourse] = useState<number | null>(null);

  const resetSelectedCourse = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  const {
    data: completedLessonIndexes,
    mutate: mutateCompletedLessons,
  } = useSWR(
    selectedCourseId ? ['database/course-progress', selectedCourseId] : null,
    async (_, course_id: number) => {
      const courseProgress = await progressRepository.findByCourseId(course_id);

      return new Set(courseProgress.map(lesson => lesson.course_lesson_index));
    },
  );

  const completeLesson = useCallback(
    async ({ lesson_id, course_lesson_index }: CompleteLessonData) => {
      if (!selectedCourseId) {
        return;
      }

      await progressRepository.create({
        course_id: selectedCourseId,
        lesson_id,
        course_lesson_index,
      });

      mutateCompletedLessons(current => {
        return new Set(current).add(course_lesson_index);
      }, true);
    },
    [mutateCompletedLessons, progressRepository, selectedCourseId],
  );

  return (
    <ProgressContext.Provider
      value={{
        completedLessonIndexes: completedLessonIndexes || new Set(),
        setSelectedCourse,
        resetSelectedCourse,
        completeLesson,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useLessonsProgress(course_id: number) {
  const context = useContext(ProgressContext);

  context.setSelectedCourse(course_id);

  return context;
}
