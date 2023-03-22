import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { FontAwesome } from 'react-native-vector-icons';


import {
  LandingScreen,
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
  ChatBotScreen,
  CategoriesScreen,
} from "./src/screens";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}>
        <>
          <Stack.Screen 
          name="LandingScreen" 
          component={LandingScreen} 
          options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            // initialParams={{ firebase }}
          />
          
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            // initialParams={{ firebase }}
          />

          <Stack.Screen
            name="Categories"
            component={CategoriesScreen}
            // initialParams={{ firebase }}
          />
        <Stack.Screen 
          name="ChatBot" 
          component={ChatBotScreen}
          options={({navigation}) => ({
          title: 'MoodMate',
          headerStyle: {
            backgroundColor: '#e1b62f',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                //Signout Logic Here
                //navigation.navigate('Login')
                console.log("Hi In signout");
              }}>
                <FontAwesome name="user" size={25} color="#fff" style={{ marginRight: 10 }} />
              </TouchableOpacity>
          ),
          })}
        />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
