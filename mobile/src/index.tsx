import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Rubik_400Regular } from '@expo-google-fonts/rubik';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

import Router from './routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    rubik400: Rubik_400Regular,
    roboto400: Roboto_400Regular,
    roboto500: Roboto_500Medium,
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {fontsLoaded ? (
        <>
          <StatusBar style="light" />
          <Router />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default App;
