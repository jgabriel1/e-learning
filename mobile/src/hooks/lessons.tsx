import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import useSWR from 'swr';

import { useCourses } from './courses';

import api from '../services/api';

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

type SelectedLessonReducer = React.Reducer<
  { selectedLesson: ILessonData | null },
  | { type: 'SET_ID'; id: number }
  | { type: 'SET_NEXT' }
  | { type: 'SET_PREVIOUS' }
>;

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

  const [
    { selectedLesson },
    selectedLessonDispatch,
  ] = useReducer<SelectedLessonReducer>(
    (state, action) => {
      switch (action.type) {
        case 'SET_ID': {
          const selected = lessons?.find(lesson => lesson.id === action.id);

          return {
            ...state,
            selectedLesson: selected || null,
          };
        }
        case 'SET_NEXT': {
          const nextLessonIndex = state.selectedLesson
            ? state.selectedLesson.lessonIndex + 1
            : -1;

          const next = lessons?.find(
            lesson => lesson.lessonIndex === nextLessonIndex,
          );

          return {
            ...state,
            selectedLesson: next || null,
          };
        }
        case 'SET_PREVIOUS': {
          const previousLessonIndex = state.selectedLesson
            ? state.selectedLesson.lessonIndex - 1
            : -1;

          const previous = lessons?.find(
            lesson => lesson.lessonIndex === previousLessonIndex,
          );

          return {
            ...state,
            selectedLesson: previous || null,
          };
        }
        default:
          return state;
      }
    },
    { selectedLesson: null },
  );

  const setSelectedLesson = useCallback((lesson_id: number) => {
    selectedLessonDispatch({ type: 'SET_ID', id: lesson_id });
  }, []);

  const setNextLesson = useCallback(() => {
    selectedLessonDispatch({ type: 'SET_NEXT' });
  }, []);

  const setPreviousLesson = useCallback(() => {
    selectedLessonDispatch({ type: 'SET_PREVIOUS' });
  }, []);

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
