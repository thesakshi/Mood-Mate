import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatBotScreen } from './src/screens'
import { FontAwesome } from 'react-native-vector-icons';
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
  ChatBotScreen,
} from "./src/screens";
// import { firebase } from "./src/firebase/config";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
        <Stack.Screen 
        name="ChatBot" 
        component={ChatBotScreen}
        options={({ navigation}) => ({
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
              }}
              >
                <FontAwesome name="user" size={25} color="#fff" style={{ marginRight: 10 }} />
              </TouchableOpacity>
        ),
        })}
        />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            // initialParams={{ firebase }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            // initialParams={{ firebase }}
          />
          <Stack.Screen name="ChatBot" component={ChatBotScreen} />
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
