import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

// Stack Navigators
import HomeStack from './StackNavigators';
import LibraryScreen from '../screens/LibraryScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: { focused: 'home', unfocused: 'home-outline' },
  Library: { focused: 'library', unfocused: 'library-outline' },
  Search: { focused: 'search', unfocused: 'search-outline' },
  Profile: { focused: 'person', unfocused: 'person-outline' },
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const iconSet = tabIcons[route.name];
            const iconName = focused ? iconSet.focused : iconSet.unfocused;
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.tabActive,
          tabBarInactiveTintColor: COLORS.tabInactive,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'HOME' }} />
        <Tab.Screen name="Library" component={LibraryScreen} options={{ tabBarLabel: 'LIBRARY' }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'SEARCH' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'PROFILE' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
