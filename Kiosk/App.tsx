// App.tsx
import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './screens/loading';
import LoginScreen from './screens/login';
import WarningScreen from './screens/WarningScreen';
import KioskSelectScreen from './screens/KioskSelectScreen';
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
import Home from './screens/home';
import Location from './screens/location';

import { CartProvider } from './contexts/CartContext';

// ✅ 타입 정의 통일 (이 타입을 다른 파일에서도 사용하도록 export)
export type RootStackParamList = {
  Loading: undefined;
  Login: undefined;
  Warning: undefined;
  KioskSelect: undefined;
  Menu: undefined;
  FoodSelect: undefined;
  ChooseSetOrSingle: { selectedBurger: string; singlePrice?: number };
  SelectSetDetails: { selectedBurger: string; setPrice?: number };
  Cart: undefined;
  Waiting: undefined;
  Signup: undefined;
  OrderComplete: undefined;
  Payprogress: undefined;
  Payselection: undefined;
  Counter: undefined;
  Recipt: undefined;
  Home: undefined;
  Location: undefined;
};

// 🔹 Stack Navigator 설정
const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

// 🔹 통합된 App 컴포넌트
const App = () => (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading" screenOptions={screenOptions}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Warning" component={WarningScreen} />
        <Stack.Screen name="KioskSelect" component={KioskSelectScreen} />
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
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
);

export default registerRootComponent(App);
