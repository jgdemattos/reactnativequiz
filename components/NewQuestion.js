import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { addCard } from "../actions/index.js";

import { Mutation } from "react-apollo";
import { ADD_CARD, GET_ALL_CARDS } from "../queries";

class NewQuestion extends React.Component {
  state = {
    question: "",
    answer: ""
  };
  handleAddQuestion = addCard => {
    const { entryId } = this.props.navigation.state.params;
    const { question, answer } = this.state;

    addCard({ variables: { deckId: entryId, question, answer } });
    this.props.navigation.navigate("DeckOptions", {
      entryId
    });
  };
  render() {
    return (
      <Mutation
        mutation={ADD_CARD}
        update={(cache, { data: { addCard } }) => {
          const { getAllCards } = cache.readQuery({ query: GET_ALL_CARDS });
          cache.writeQuery({
            query: GET_ALL_CARDS,
            data: { getAllCards: getAllCards.concat([addCard]) }
          });
        }}
      >
        {(addCard, { data }) => (
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
              onPress={() => this.handleAddQuestion(addCard)}
              title="Send"
              color="#841584"
              accessibilityLabel="add question"
            />
          </View>
        )}
      </Mutation>
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
