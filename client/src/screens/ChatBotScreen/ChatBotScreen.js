import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      chatLog: [{ from: "bot", message: "Hi there! How was this morning?" }],
    };
    this.scrollViewRef = React.createRef();
  }

  componentDidUpdate() {
    // Scroll to the bottom of the chat log whenever a new message is added
    this.scrollViewRef.current.scrollToEnd();
  }

  handleSend = () => {
    // Handle sending the message to a backend or chatbot service
    const newMessage = { from: "user", message: this.state.message };
    const chatLog = [...this.state.chatLog, newMessage];
    this.setState({ message: "", chatLog });
    fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: "Sakshi",
        time: "morning",
        responseQuery: newMessage["message"],
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const newMessage = { from: "bot", message: responseJson.response };
        const chatLog = [...this.state.chatLog, newMessage];
        this.setState({ chatLog });
      })
      .catch((error) => {
        console.log(error);
      });
    //setTimeout(() => this.handleBotResponse(), 1000); // Simulate bot response after 1 second
  };

  handleBotResponse = () => {
    // Simulate bot response
    const newMessage = {
      from: "bot",
      message:
        "I am a bot and do not have the ability to assist you at this time.",
    };
    const chatLog = [...this.state.chatLog, newMessage];
    this.setState({ chatLog });
  };

  renderChatLog = () => {
    return this.state.chatLog.map((message, index) => (
      <View
        key={index}
        style={
          message.from === "bot"
            ? styles.botMessageContainer
            : styles.userMessageContainer
        }
      >
        <Text style={styles.messageText}>{message.message}</Text>
      </View>
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
        
          style={styles.chatContainer}
          ref={this.scrollViewRef}
          onContentSizeChange={() => this.scrollViewRef.current.scrollToEnd()}
        >
          {this.renderChatLog()}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.message}
            onChangeText={(text) => this.setState({ message: text })}
            placeholder="Type your message here"
          />
          <TouchableOpacity style={styles.sendButton} onPress={this.handleSend}>
            <FontAwesome name="send" size={24} color="#e1b624" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fffae5",
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  userMessageContainer: {
    backgroundColor: "#f7e9b7",
    padding: 10,
    borderRadius: 25,
    alignSelf: "flex-end",
    marginBottom: 5,
  },

  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  botMessageContainer: {
    backgroundColor: "#f7e9b7",
    padding: 10,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginBottom: 15,
    marginTop: 10,
  },
  messageText: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: "#f7e9b7",
    flexDirection: "row",
    overflow: "scroll",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingStart: 15,
    paddingEnd: 15,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    height: 40,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingEnd: 10,
  },
});
