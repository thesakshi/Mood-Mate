import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>mooDMate</Text>
      <Text style={{ marginBottom: 80 }}>
        Motivational Quotes To Boost Your Mood 🚀
      </Text>

      <View style={styles.buttonsContainer}>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
          style={styles.button}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        />
      </View>
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column", // change to column
    alignItems: "center", // align buttons horizontally at the center
    width: "70%",
  },
  button: {
    backgroundColor: "#FFD54F",
    borderRadius: 10, // increase border radius to make it more rounded
    paddingVertical: 20, // use paddingVertical to add vertical padding
    paddingHorizontal: 16, // use paddingHorizontal to add horizontal padding
    shadowColor: "#000", // add shadow to create the indented look
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default HomeScreen;
