import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Tab from '../Tab';

import { Container } from './styles';

const BottomTab: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <Container>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        return (
          <Tab
            key={route.key}
            name={options.title || route.name}
            focused={state.index === index}
            tabBarIcon={options.tabBarIcon}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </Container>
  );
};

export default BottomTab;
