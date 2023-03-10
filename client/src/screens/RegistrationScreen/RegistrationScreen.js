import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const { firebase } = route.params;

  const handleRegistration = () => {
    alert("register pressed!");
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     firebase.database().ref(`users/${user.uid}`).set({
    //       email,
    //       name,
    //     });
    //     navigation.navigate("Login");
    //   })
    //   .catch((error) => {
    //     const errorMessage = error.message;
    //     console.log(errorMessage);
    //   });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Name"
        onChangeText={setName}
      />
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
    height: 50,
    margin: 10,
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
