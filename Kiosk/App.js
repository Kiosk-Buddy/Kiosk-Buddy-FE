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
import Counter from './screens/Counter';
import Finish from './screens/Finish';
import Loading from './screens/loading';
import Login from './screens/login';
import Payprogress from './screens/Payprogress';
import Payselection from './screens/Payselection';
import Recipt from './screens/Recipt';

const Stack = createStackNavigator();

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Payselection" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Warning" component={WarningScreen} />
          <Stack.Screen name="KioskSelect" component={KioskSelectScreen} />
          <Stack.Screen name="FoodSelect" component={FoodSelectScreen} />
          <Stack.Screen name="ChooseSetOrSingle" component={ChooseSetOrSingleScreen} />
          <Stack.Screen name="SelectSetDetails" component={SelectSetDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Recipt" component={Recipt} />
          <Stack.Screen name="Counter" component={Counter} />
          <Stack.Screen name="Finish" component={Finish} />
          <Stack.Screen name="Payprogress" component={Payprogress} />
          <Stack.Screen name="Payselection" component={Payselection} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default registerRootComponent(App);
