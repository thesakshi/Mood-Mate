import React, {useEffect} from "react";
import { View, Button, Text, StyleSheet, Image } from "react-native";
import * as Animatable from "react-native-animatable";

const LandingScreen = ({ navigation }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
        navigation.navigate('Register');
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={styles.container}>
      
      <Image source={require('/Users/sakshi/Desktop/Mood-Mate/Mood-Mate/client/assets/logo.png')} style={StyleSheet.image} />
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffae5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
      flex: 1, 
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: "80%",
      height: "80%",
      resizeMode: "contain",
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        paddingRight: 100,
        resizeMode: 'contain',
    },
});

export default LandingScreen;