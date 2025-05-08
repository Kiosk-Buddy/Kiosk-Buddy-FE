// App.tsx

import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WarningScreen from './screens/WarningScreen';
import KioskSelectScreen from './screens/KioskSelectScreen';
import MenuScreen from './screens/menu';
import ChooseSetOrSingleScreen from './screens/ChooseSetOrSingleScreen';
import SelectSetDetailsScreen from './screens/SelectSetDetailsScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';

import { CartProvider } from './contexts/CartContext';

// 🔹 이 부분을 추가 — Navigator에 사용할 파라미터 리스트 타입 정의
export type RootStackParamList = {
  Warning: undefined;
  KioskSelect: undefined;
  menu: undefined;
  FoodSelect: undefined;
  ChooseSetOrSingle: { selectedBurger: string; singlePrice?: number };
  SelectSetDetails: { selectedBurger: string; setPrice?: number };
  Cart: undefined;
  Payment: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

const App = () => (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Warning" screenOptions={screenOptions}>
        <Stack.Screen name="Warning" component={WarningScreen} />
        <Stack.Screen name="KioskSelect" component={KioskSelectScreen} />
        <Stack.Screen name="menu" component={MenuScreen} />
        <Stack.Screen name="ChooseSetOrSingle" component={ChooseSetOrSingleScreen} />
        <Stack.Screen name="SelectSetDetails" component={SelectSetDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
);

export default registerRootComponent(App);
