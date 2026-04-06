import React, { useState, useEffect } from 'react';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { COLORS } from './src/constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Uygulama açılışında token kontrolü yap
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error("Token alınırken hata:", e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    onLogin: (token) => {
      setUserToken(token);
    },
    onLogout: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        setUserToken(null);
      } catch (e) {
        console.error("Çıkış yaparken hata:", e);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          {userToken == null ? (
            // Kullanıcı giriş yapmamışsa
            <>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                initialParams={{ onLogin: authContext.onLogin }}
              />
              <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                initialParams={{ onLogin: authContext.onLogin }}
              />
            </>
          ) : (
            // Kullanıcı giriş yapmışsa
            <Stack.Screen 
              name="Main" 
              component={AppNavigator} 
              initialParams={{ onLogout: authContext.onLogout }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
