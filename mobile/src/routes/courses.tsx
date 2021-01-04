import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import TabBar from './components/TabBar';
import Home from '../pages/Home';
import MyCourses from '../pages/MyCourses';

const { Navigator, Screen } = createBottomTabNavigator();

const CourseTabs: React.FC = () => (
  <Navigator tabBar={props => <TabBar {...props} />}>
    <Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="home"
            size={20}
            color={focused ? '#FF6680' : '#C4C4D1'}
          />
        ),
      }}
    />
    <Screen
      name="MyCourses"
      component={MyCourses}
      options={{
        title: 'Salvos',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="heart"
            size={20}
            color={focused ? '#FF6680' : '#C4C4D1'}
          />
        ),
      }}
    />
  </Navigator>
);

export default CourseTabs;
