import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {CalculatorScreen} from './src/screens/CalculatorScreen';
import {styles} from './src/theme/appTheme';

export const App = () => {
  return (
    // SaeAreaView es para iPhones
    <SafeAreaView style={styles.background}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <CalculatorScreen />
    </SafeAreaView>
  );
};
