import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Image, TouchableOpacity, Text} from "react-native";
import { firebase } from "../../firebase/config";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User successfully logged in
        const user = userCredential.user;
        console.log("User logged in: ", user.uid);
        alert("Succesfull login!");
        navigation.navigate("Categories");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Failed login!");
        navigation.navigate("Login");
      });
  };

  return (

    <View style={styles.container}>

      <Image 
       source={require('/Users/sakshi/Desktop/Mood-Mate/Mood-Mate/client/assets/logo.png')}
       style={styles.logo}
       //style={{position: 'absolute', top: -380}}
      />
      <Text style={styles.createAccount}>Hello, Again!</Text>
       <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        placeholderTextColor="gray"
      />

      <TouchableOpacity onPress={handleLogin} style={styles.LoginButton}>
        <Text style={styles.LoginText}>Login</Text>
        
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAE5",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  createAccount: {
    color: "#E1B62F",
    fontSize: 30,

    fontWeight: "bold",
    marginBottom: 30,
  },
  logo: {
    position: "absolute",
    top: 20,
    width: 320,
    height: 320,
  },
  input: {
    width: "80%",
    height: 35,
   
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 3,
  },
  LoginButton: {
    marginTop: 30,
    borderWidth: 1,
    width: 120,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E1B62F",
    borderColor: "white",
  },
  LoginText: {
    color: "white",
    fontSize: 20,

  },

});


export default LoginScreen;

 