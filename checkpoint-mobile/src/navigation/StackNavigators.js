import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GameDetailScreen from '../screens/GameDetailScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SearchScreen from '../screens/SearchScreen';

const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="GameDetail" component={GameDetailScreen} />
      <HomeStack.Screen name="Review" component={ReviewScreen} />
    </HomeStack.Navigator>
  );
}

export function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
      <SearchStack.Screen name="GameDetail" component={GameDetailScreen} />
    </SearchStack.Navigator>
  );
}
