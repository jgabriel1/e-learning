import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home';
import MyCourses from '../pages/MyCourses';

const { Navigator, Screen } = createBottomTabNavigator();

const CourseTabs: React.FC = () => (
  <Navigator>
    <Screen name="Home" component={Home} />
    <Screen name="MyCourses" component={MyCourses} />
  </Navigator>
);

export default CourseTabs;
