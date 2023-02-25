import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginScreen, RegisterScreen } from "./screens";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
