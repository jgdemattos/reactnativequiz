import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button
} from "react-native";

class NewQuestion extends React.Component {
  state = {
    question: "",
    answer: ""
  };
  render() {
    const deck = this.props.deck;
    return (
      <View style={styles.item}>
        <View style={styles.item}>
          <Text>Question</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />
        </View>
        <View style={styles.item}>
          <Text>Answer</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
        <Button
          onPress={() =>
            this.props.navigation.navigate("DeckOptions", {
              entryId: this.props.navigation.state.params.entryId
            })
          }
          title="Send"
          color="#841584"
          accessibilityLabel="add question"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center"
  },
  item: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "center",

    backgroundColor: "white",
    padding: 20,

    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3
  }
});
export default NewQuestion;
