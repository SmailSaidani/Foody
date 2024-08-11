import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TailwindProvider } from 'tailwindcss-react-native';
import Home from './screens/Home';
import * as React from 'react';
import { Provider } from 'react-redux';
import RestaurantSc from './screens/RestaurantSc';
import { store } from './Redux';
import PanierSc from './screens/PanierSc';
import CommandeEnc from './screens/CommandeEnc';
import Livraison from './screens/Livraison';
import Welcoms from './screens/Welcoms';
export default function App() {
  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Provider store={store}>
      <TailwindProvider>
      <Stack.Navigator>
      <Stack.Screen name='Welcome' component={Welcoms}  options={{presentation:'modal', headerShown:false}} />

        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='Restaurant' component={RestaurantSc}></Stack.Screen>

        <Stack.Screen name='Panier' component={PanierSc}
         options={{presentation:'modal', headerShown:false}} />
        <Stack.Screen name='CommandeEnc' component={CommandeEnc}
        options={{
          presentation:'modal',
          headerShown:false
        }}></Stack.Screen>

        <Stack.Screen name='Livraison' component={Livraison}
        options={{
          presentation:'modal',
          headerShown:false
        }}></Stack.Screen>
      </Stack.Navigator>
      </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}


