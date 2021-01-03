import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LessonsStack from './lessons';
import CourseTabs from './courses';

const { Navigator, Screen } = createStackNavigator();

const Router: React.FC = () => (
  <NavigationContainer>
    <Navigator headerMode="none">
      <Screen name="CourseTabs" component={CourseTabs} />
      <Screen name="LessonsStack" component={LessonsStack} />
    </Navigator>
  </NavigationContainer>
);

export default Router;
