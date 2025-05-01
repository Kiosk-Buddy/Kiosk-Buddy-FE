import { registerRootComponent } from 'expo';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import WaitingScreen from './screens/WaitingScreen';
import SignupScreen from './screens/SignupScreen';
import LearningMethodScreen from './screens/LearningMethodScreen';
import SimulationDifficultyScreen from './screens/SimulationDifficultyScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Waiting" screenoptions={{ headerShown: false }}>
        <Stack.Screen name="Waiting" component={WaitingScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="LearningMethod" component={LearningMethodScreen} />
        <Stack.Screen name="SimulationDifficulty" component={SimulationDifficultyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
