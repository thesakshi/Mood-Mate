import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Alert, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../firebase/config";

import LemonRegular from '/Users/sakshi/Desktop/Mood-Mate/Mood-Mate/client/Font/Lemon-Regular.ttf';

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegistration = () => {
    // alert(firebase);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // firebase.database().ref(users/${user.uid}).set({
        //   email,
        //   name,
        // });
        Alert.alert("Success", "Successfully Registered!", [
          {
            text: "OK",
            onPress: () => {
              // Navigate to the Login screen
              navigation.navigate("Categories");
            },
          },
        ]);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (

    <View style={styles.container}>

      <Image 
       source={require('/Users/sakshi/Desktop/Mood-Mate/Mood-Mate/client/assets/logo.png')}
       style={styles.logo}
       //style={{position: 'absolute', top: -380}}
      />
      <Text style={styles.createAccount}>Create Account</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Name"
        onChangeText={setName}
        placeholderTextColor="gray"
      />

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

      {/* <Button title="Register" onPress={handleRegistration} style={styles.container}/> */}
      <TouchableOpacity onPress={handleRegistration} style={styles.registerButton}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAE5",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  createAccount: {
    color: "#E1B62F",
    fontSize: 24,

    fontWeight: "bold",
    marginBottom: 30,
  },
  logo: {
    position: "absolute",
    top: -15,
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
  registerButton: {
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
  registerText: {
    color: "white",
    fontSize: 20,

  },
  loginText: {
    marginTop: 50,
    fontSize: 16,
  },
  loginButton: {
    fontWeight: "bold",
  },
});


export default RegistrationScreen;