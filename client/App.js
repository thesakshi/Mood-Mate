import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatBotScreen } from './src/screens'
import { FontAwesome } from 'react-native-vector-icons';
const Stack = createStackNavigator();


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

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
        </>
      </Stack.Navigator>
    </NavigationContainer>

  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
