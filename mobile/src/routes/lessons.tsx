import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Lessons from '../pages/Lessons';
import LessonDetail from '../pages/LessonDetail';
import PlayVideo from '../pages/PlayVideo';

const { Navigator, Screen } = createStackNavigator();

const LessonsStack: React.FC = () => (
  <Navigator headerMode="none">
    <Screen name="Lessons" component={Lessons} />
    <Screen name="LessonDetail" component={LessonDetail} />
    <Screen name="PlayVideo" component={PlayVideo} />
  </Navigator>
);

export default LessonsStack;
