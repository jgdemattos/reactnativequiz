import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import { Mutation } from "react-apollo";
import { ADD_DECK, GET_ALL_DECKS } from "../queries";

class NewDeck extends React.Component {
  state = {
    deckName: "",
    successfullyCreated: null,
    created: false,
    nextId: null
  };
  handleGoToOptions = () => {};
  handleAddDeck = addDeck => {
    const { deckName } = this.state;

    addDeck({ variables: { name: deckName } }).then(({ data }) =>
      this.setState({ nextId: data.addDeck._id })
    );
  };
  handleAddDeckName = deckName => {
    this.setState({ deckName });
  };
  /*   handleAddDeckName = deckName => {
    this.setState({ deckName });
  }; */
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.nextId) {
      nextProps.navigation.navigate("DeckOptions", {
        entryId: nextState.nextId
      });
      return false;
    }
    return true;
  }
  render() {
    return (
      <Mutation
        mutation={ADD_DECK}
        update={(cache, { data: { addDeck } }) => {
          const { getAllDecks, getAllCards } = cache.readQuery({
            query: GET_ALL_DECKS
          });

          cache.writeQuery({
            query: GET_ALL_DECKS,
            data: { getAllDecks: getAllDecks.concat([addDeck]), getAllCards }
          });
        }}
      >
        {(addDeck, { data }) => (
          <View style={styles.item}>
            <View style={styles.item}>
              <Text>Deck name</Text>
              <TextInput
                style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                onChangeText={deckName => this.handleAddDeckName(deckName)}
                value={this.state.deckName}
              />
            </View>
            <Button
              onPress={() => this.handleAddDeck(addDeck)}
              title="Send"
              color="#841584"
              accessibilityLabel="add deck"
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

export default NewDeck;
