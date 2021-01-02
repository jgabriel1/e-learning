import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Rubik_400Regular } from '@expo-google-fonts/rubik';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

import Home from './pages/Home';

// rubik 400 roboto 400 500

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    rubik400: Rubik_400Regular,
    roboto400: Roboto_400Regular,
    roboto500: Roboto_500Medium,
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {fontsLoaded ? (
        <>
          <StatusBar style="light" />
          <Home />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default App;
