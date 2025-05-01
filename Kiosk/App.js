import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WarningScreen from './screens/WarningScreen';
import KioskSelectScreen from './screens/KioskSelectScreen';
import FoodSelectScreen from './screens/FoodSelectScreen';
import ChooseSetOrSingleScreen from './screens/ChooseSetOrSingleScreen';
import SelectSetDetailsScreen from './screens/SelectSetDetailsScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';

import { CartProvider } from './contexts/CartContext';

const Stack = createStackNavigator();

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Warning" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Warning" component={WarningScreen} />
          <Stack.Screen name="KioskSelect" component={KioskSelectScreen} />
          <Stack.Screen name="FoodSelect" component={FoodSelectScreen} />
          <Stack.Screen name="ChooseSetOrSingle" component={ChooseSetOrSingleScreen} />
          <Stack.Screen name="SelectSetDetails" component={SelectSetDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default registerRootComponent(App);
