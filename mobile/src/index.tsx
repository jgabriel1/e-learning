import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar style="auto" />
      <Text>Hello World</Text>
    </View>
  );
};

export default App;
