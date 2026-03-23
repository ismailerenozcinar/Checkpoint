import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GameDetailScreen from '../screens/GameDetailScreen';
import ReviewScreen from '../screens/ReviewScreen';

const Stack = createNativeStackNavigator();

// Home sekmesinin stack navigasyonu
// Home -> GameDetail -> Review şeklinde ilerler
export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="GameDetail" component={GameDetailScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  );
}
