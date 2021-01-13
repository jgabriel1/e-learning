import useSWR from 'swr';

import api from '../../services/api';

interface ILessonResponseData {
  id: number;
  name: string;
  duration: number;
}

interface ILessonData {
  id: number;
  name: string;
  duration: number;
  lessonIndex: number;
  isCompleted: boolean;
}

export default function useCourseLessons(course_id: number) {
  const { data: backendLessonsData } = useSWR<ILessonData[]>(
    `courses/${course_id}/lessons`,
    async (url: string) => {
      const response = await api.get<ILessonResponseData[]>(url);

      return response.data.map((lesson, index) => ({
        id: lesson.id,
        name: lesson.name,
        duration: lesson.duration,
        lessonIndex: index + 1,
        isCompleted: false,
      }));
    },
  );

  return {
    lessons: backendLessonsData || [],
  };
}
