import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { firebase } = route.params;

  const handleLogin = () => {
    alert("login pressed!");
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     // User successfully logged in
    //     const user = userCredential.user;
    //     console.log("User logged in: ", user.uid);
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
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.registerText}>
        Don't have an account?{" "}
        <Text
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          Register
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
  registerText: {
    marginTop: 20,
    fontSize: 16,
  },
  registerButton: {
    fontWeight: "bold",
  },
});

export default LoginScreen;
