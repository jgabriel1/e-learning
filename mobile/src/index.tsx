import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar style="light" />
      <Home />
    </View>
  );
};

export default App;
