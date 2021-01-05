import React from 'react';

import { Pressable, Container, Title } from './styles';

interface TabProps {
  name: string;
  focused: boolean;
  tabBarIcon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode;
  onPress: () => void | Promise<void>;
}

const Tab: React.FC<TabProps> = ({ name, focused, tabBarIcon, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Container focused={focused}>
        {tabBarIcon && tabBarIcon({ focused, color: '', size: 0 })}

        <Title focused={focused}>{name}</Title>
      </Container>
    </Pressable>
  );
};

export default Tab;
