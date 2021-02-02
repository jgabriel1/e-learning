import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import useSWR from 'swr';

import { useCourses } from './courses';

import api from '../services/api';

interface ILessonsListResponseData {
  id: number;
  name: string;
  duration: number;
  lesson_index: number;
  course_id: number;
}

interface ILessonDetailsResponseData {
  id: number;
  name: string;
  duration: number;
  lesson_index: number;
  description: string;
  video_id: string;
  thumbnail_url: string;
}

interface ILessonData {
  id: number;
  name: string;
  duration: number;
  description: string;
  lessonIndex: number;
  thumbnail_url: string;
  isCompleted?: boolean;
  videoId: string;
}

interface ILessonDetailsData {
  description: string;
  thumbnail_url: string;
  video_id: string;
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
  | { type: 'SET_DETAILS'; details: ILessonDetailsData }
>;

const LessonsContext = createContext<LessonsContextData>(
  {} as LessonsContextData,
);

export const LessonsProvider: React.FC = ({ children }) => {
  const { selectedCourse: course } = useCourses();

  const { data: lessons } = useSWR<ILessonData[]>(
    course ? `courses/${course.id}/lessons` : null,
    async (url: string) => {
      const response = await api.get<ILessonsListResponseData[]>(url);

      return response.data.map(lesson => {
        return {
          id: lesson.id,
          name: lesson.name,
          duration: lesson.duration,
          lessonIndex: lesson.lesson_index,
          videoId: '',
          description: '',
          thumbnail_url: '',
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
        case 'SET_DETAILS': {
          return {
            ...state,
            selectedLesson: state.selectedLesson && {
              ...state.selectedLesson,
              ...action.details,
            },
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

  const setLessonDetails = useCallback(
    ({ description, thumbnail_url, video_id }: ILessonDetailsData) => {
      selectedLessonDispatch({
        type: 'SET_DETAILS',
        details: { description, thumbnail_url, video_id },
      });
    },
    [],
  );

  useEffect(() => {
    if (selectedLesson && !selectedLesson.description) {
      api
        .get<ILessonDetailsResponseData>(`lessons/${selectedLesson.id}`)
        .then(({ data }) => {
          setLessonDetails({
            description: data.description,
            thumbnail_url: data.thumbnail_url,
            video_id: data.video_id,
          });
        });
    }
  }, [selectedLesson, setLessonDetails]);

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
