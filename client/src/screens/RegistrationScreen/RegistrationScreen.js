import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Alert } from "react-native";
import { firebase } from "../../firebase/config";

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
        // firebase.database().ref(`users/${user.uid}`).set({
        //   email,
        //   name,
        // });
        Alert.alert("Success", "Successfully Registered!", [
          {
            text: "OK",
            onPress: () => {
              // Navigate to the Login screen
              navigation.navigate("Login");
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
      <Button title="Register" onPress={handleRegistration} />
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
    backgroundColor: "#FFF9C4",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 40,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
  },
  loginButton: {
    fontWeight: "bold",
  },
});

export default RegistrationScreen;
