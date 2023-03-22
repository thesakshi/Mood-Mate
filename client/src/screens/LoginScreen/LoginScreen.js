import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import firebase from "firebase";

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
        navigation.navigate("Home");
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
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 50,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default LoginScreen;
