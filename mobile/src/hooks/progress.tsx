import React, { createContext, useCallback, useContext, useMemo } from 'react';
import useSWR from 'swr';

import { useCourses } from './courses';
import { useDatabaseConnection } from './database';

import { CourseProgressRepository } from '../services/database/repositories/CourseProgressRepository';

interface CompleteLessonData {
  lesson_id: number;
  course_lesson_index: number;
}

interface ProgressContextData {
  completedLessonIndexes: Set<number>;
  completeLesson: (data: CompleteLessonData) => Promise<void>;
}

const ProgressContext = createContext({} as ProgressContextData);

export const ProgressProvider: React.FC = ({ children }) => {
  const { connection } = useDatabaseConnection();

  const progressRepository = useMemo(() => {
    return new CourseProgressRepository(connection);
  }, [connection]);

  const { selectedCourse } = useCourses();

  const {
    data: completedLessonIndexes,
    mutate: mutateCompletedLessons,
  } = useSWR(
    selectedCourse ? ['database/course-progress', selectedCourse.id] : null,
    async (_, course_id: number) => {
      const courseProgress = await progressRepository.findByCourseId(course_id);

      return new Set(courseProgress.map(lesson => lesson.course_lesson_index));
    },
  );

  const completeLesson = useCallback(
    async ({ lesson_id, course_lesson_index }: CompleteLessonData) => {
      if (!selectedCourse) {
        return;
      }

      await progressRepository.create({
        course_id: selectedCourse.id,
        lesson_id,
        course_lesson_index,
      });

      mutateCompletedLessons(current => {
        return new Set(current).add(course_lesson_index);
      }, true);
    },
    [mutateCompletedLessons, progressRepository, selectedCourse],
  );

  return (
    <ProgressContext.Provider
      value={{
        completedLessonIndexes: completedLessonIndexes || new Set(),
        completeLesson,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useLessonsProgress() {
  const context = useContext(ProgressContext);

  return context;
}
