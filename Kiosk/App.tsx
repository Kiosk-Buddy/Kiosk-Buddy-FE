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

export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Warning: undefined;
  KioskSelect: undefined;
  TestDifficulty: undefined;
  SingleOrderScenario: { scenario: 'easy' | 'medium' | 'hard'; missionItems: string[] };
  SetOrderScenario:    { scenario: 'easy' | 'medium' | 'hard'; missionItems: string[] };
  FullOrderScenario:   { scenario: 'easy' | 'medium' | 'hard'; missionItems: string[] };
  Menu:                { scenario: 'easy' | 'medium' | 'hard'; missionItems: string[] };
  ChooseSetOrSingle:   { selectedBurger: string; singlePrice?: number; scenario: 'easy' | 'medium' | 'hard'; missionItems: string[] ; requiredType: 'set' | 'single';};
  SelectSetDetails:    { selectedBurger: string; setPrice?: number; scenario: 'easy' | 'medium' | 'hard'; missionItems: string[];
    requiredSide: string;    // 사이드 미션
    requiredDrink: string;   // 음료 미션
    requiredExtra: string;};
  Cart: {
    scenario: 'easy' | 'medium' | 'hard';
    missionItems: string[];
  };
  Waiting:             undefined;
  Signup:              undefined;
  OrderComplete:       undefined;
  Payprogress:         undefined;
  Payselection:        undefined;
  Counter:             undefined;
  Recipt:              undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Warning" component={WarningScreen} />
        <Stack.Screen name="KioskSelect" component={KioskSelectScreen} />

        {/* 난이도 선택 및 시나리오 */}
        <Stack.Screen name="TestDifficulty" component={TestDifficultyScreen} />
        <Stack.Screen name="SingleOrderScenario" component={SingleOrderScenario} />
        <Stack.Screen name="SetOrderScenario" component={SetOrderScenario} />
        <Stack.Screen name="FullOrderScenario" component={FullOrderScenario} />

        {/* 주문 흐름 */}
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
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
);

export default registerRootComponent(App);
