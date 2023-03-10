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
