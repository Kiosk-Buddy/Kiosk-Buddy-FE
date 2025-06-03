// App.tsx
import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './screens/loading';
import LoginScreen from './screens/login';
import WarningScreen from './screens/WarningScreen';
import KioskSelectScreen from './screens/KioskSelectScreen';
import TestDifficultyScreen from './screens/TestDifficultyScreen';
import SimulationDifficultyScreen from './screens/SimulationDifficultyScreen';
import LearningMethodScreen from './screens/LearningMethodScreen';

import SingleOrderScenario from './screens/SingleOrderScenario';
import SetOrderScenario from './screens/SetOrderScenario';
import FullOrderScenario from './screens/FullOrderScenario';
import MenuScreen from './screens/menu';
import ChooseSetOrSingleScreen from './screens/ChooseSetOrSingleScreen';
import SelectSetDetailsScreen from './screens/SelectSetDetailsScreen';
import CartScreen from './screens/CartScreen';
import WaitingScreen from './screens/WaitingScreen';
import SignupScreen from './screens/SignupScreen';
import OrderCompleteScreen from './screens/OrderCompleteScreen';
import PayprogressScreen from './screens/Payprogress';
import PayselectionScreen from './screens/Payselection';
import CounterScreen from './screens/Counter';
import ReciptScreen from './screens/Recipt';
import { CartProvider } from './contexts/CartContext';
import Location from './screens/location';
import Home from './screens/home';

import LearnEasy_HomeScreen from './screens/LearnEasy_HomeScreen';
import LearnEasy_LocationScreen from './screens/LearnEasy_LocationScreen';
import LearnEasy_MenuScreen from './screens/LearnEasy_MenuScreen';
import LearnEasy_ChooseSetOrSingleScreen from './screens/LearnEasy_ChooseSetOrSingleScreen';
import LearnEasy_SelectSetDetailsScreen from './screens/LearnEasy_SelectSetDetailsScreen';
import LearnEasy_CartScreen from './screens/LearnEasy_CartScreen';
import LearnEasy_PayselectionScreen from './screens/LearnEasy_PayselectionScreen';
import LearnEasy_PayprogressScreen from './screens/LearnEasy_PayprogressScreen';
import LearnEasy_ReciptScreen from './screens/LearnEasy_ReciptScreen';
import LearnEasy_CounterScreen from './screens/LearnEasy_CounterScreen';

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Warning: undefined;
  KioskSelect: undefined;
  LearningMethod: undefined;
  SimulationDifficultyScreen: { mode: 'learn' };
  TestDifficultyScreen: { mode: 'test' };
  Home: { mode?: 'learn' | 'test'; scenario: 'easy' | 'medium' | 'hard' };
  Location: { mode?: 'learn' | 'test'; scenario: 'easy' | 'medium' | 'hard' };

  SingleOrderScenario: {
    scenario: 'easy' | 'medium' | 'hard';
    missionItems: string[];
    mode?: 'learn' | 'test';
  };
  SetOrderScenario: {
    scenario: 'easy' | 'medium' | 'hard';
    missionItems?: string[];
    mode?: 'learn' | 'test';
  };
  FullOrderScenario: {
    scenario: 'easy' | 'medium' | 'hard';
    missionItems?: string[];
    mode?: 'learn' | 'test';
  };

  Menu: {
    scenario: 'easy' | 'medium' | 'hard';
    missionItems?: string[];
    mode?: 'learn' | 'test';
    currentStep?: number;
  };
  ChooseSetOrSingle: {
    selectedBurger: string;
    singlePrice?: number;
    scenario: 'easy' | 'medium' | 'hard';
    missionItems?: string[];
    requiredType: 'set' | 'single';
    mode?: 'learn' | 'test';
    currentStep?: number;
  };
  SelectSetDetails: {
    selectedBurger: string;
    setPrice?: number;
    scenario: 'easy' | 'medium' | 'hard';
    missionItems?: string[];
    requiredSide: string;
    requiredDrink: string;
    requiredExtra: string;
    mode?: 'learn' | 'test';
    currentStep?: number;
  };
  Cart: {
    scenario: 'easy' | 'medium' | 'hard';
    missionItems?: string[];
    mode?: 'learn' | 'test';
    currentStep?: number;
  };
  Waiting: undefined;
  Signup: undefined;
  OrderComplete: { mode?: 'learn' | 'test' };
  Payprogress: { mode?: 'learn' | 'test' };
  Payselection: { mode?: 'learn' | 'test' };
  Counter: { mode?: 'learn' | 'test' };
  Recipt: { mode?: 'learn' | 'test' };

  LearnEasy_HomeScreen: undefined;
  LearnEasy_LocationScreen: undefined;
  LearnEasy_MenuScreen: undefined;
  LearnEasy_ChooseSetOrSingleScreen: undefined;
  LearnEasy_SelectSetDetailsScreen: undefined;
  LearnEasy_CartScreen: undefined;
  LearnEasy_PayselectionScreen: undefined;
  LearnEasy_PayprogressScreen: undefined;
  LearnEasy_ReciptScreen: undefined;
  LearnEasy_CounterScreen: undefined;
};


const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

const App = () => (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={screenOptions}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Warning" component={WarningScreen} />
        <Stack.Screen name="KioskSelect" component={KioskSelectScreen} />
        <Stack.Screen name="LearningMethod" component={LearningMethodScreen} />
        <Stack.Screen name="SimulationDifficultyScreen" component={SimulationDifficultyScreen} />
        <Stack.Screen name="TestDifficultyScreen" component={TestDifficultyScreen} />
        <Stack.Screen name="SingleOrderScenario" component={SingleOrderScenario} />
        <Stack.Screen name="SetOrderScenario" component={SetOrderScenario} />
        <Stack.Screen name="FullOrderScenario" component={FullOrderScenario} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="ChooseSetOrSingle" component={ChooseSetOrSingleScreen} />
        <Stack.Screen name="SelectSetDetails" component={SelectSetDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Waiting" component={WaitingScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
        <Stack.Screen name="Payprogress" component={PayprogressScreen} />
        <Stack.Screen name="Payselection" component={PayselectionScreen} />
        <Stack.Screen name="Counter" component={CounterScreen} />
        <Stack.Screen name="Recipt" component={ReciptScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Location" component={Location} />

        <Stack.Screen name="LearnEasy_HomeScreen" component={LearnEasy_HomeScreen} />
        <Stack.Screen name="LearnEasy_LocationScreen" component={LearnEasy_LocationScreen} />
        <Stack.Screen name="LearnEasy_MenuScreen" component={LearnEasy_MenuScreen} />
        <Stack.Screen name="LearnEasy_ChooseSetOrSingleScreen" component={LearnEasy_ChooseSetOrSingleScreen} />
        <Stack.Screen name="LearnEasy_SelectSetDetailsScreen" component={LearnEasy_SelectSetDetailsScreen} />
        <Stack.Screen name="LearnEasy_CartScreen" component={LearnEasy_CartScreen} />
        <Stack.Screen name="LearnEasy_PayselectionScreen" component={LearnEasy_PayselectionScreen} />
        <Stack.Screen name="LearnEasy_PayprogressScreen" component={LearnEasy_PayprogressScreen} />
        <Stack.Screen name="LearnEasy_ReciptScreen" component={LearnEasy_ReciptScreen} />
        <Stack.Screen name="LearnEasy_CounterScreen" component={LearnEasy_CounterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
);

export default registerRootComponent(App);
