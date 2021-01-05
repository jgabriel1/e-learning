import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Lessons from '../pages/Lessons';
import LessonDetail from '../pages/LessonDetail';

type LessonsStackParams = {
  Lessons: { course_id: number };
  LessonDetail: { lesson_id: number };
};

type LessonsRouteProp<T extends 'Lessons' | 'LessonDetail'> = RouteProp<
  LessonsStackParams,
  T
>;

const { Navigator, Screen } = createStackNavigator<LessonsStackParams>();

const LessonsStack: React.FC = () => (
  <Navigator headerMode="none">
    <Screen name="Lessons" component={Lessons} />
    <Screen name="LessonDetail" component={LessonDetail} />
  </Navigator>
);

export default LessonsStack;

export function useCourseId() {
  const { params } = useRoute<LessonsRouteProp<'Lessons'>>();

  return params.course_id;
}

export function useLessonId() {
  const { params } = useRoute<LessonsRouteProp<'LessonDetail'>>();

  return params.lesson_id;
}
