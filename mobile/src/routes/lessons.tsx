import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Lessons from '../pages/Lessons';
import LessonDetail from '../pages/LessonDetail';

const { Navigator, Screen } = createStackNavigator();

const LessonsStack: React.FC = () => (
  <Navigator headerMode="none">
    <Screen name="Lessons" component={Lessons} />
    <Screen name="LessonDetail" component={LessonDetail} />
  </Navigator>
);

export default LessonsStack;
