import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions/index.js";

class NewDeck extends React.Component {
  state = {
    deckName: "",
    successfullyCreated: null
  };
  handleGoToOptions = () => {};
  handleAddDeck = () => {
    const { dispatch } = this.props;
    const { deckName } = this.state;
    dispatch(
      addDeck({
        deckName
      })
    );
    this.props.navigation.navigate("DeckOptions", {
      entryId: this.props.lastId
    });
  };
  handleAddDeckName = deckName => {
    this.setState({ deckName });
  };
  render() {
    return (
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
          onPress={this.handleAddDeck}
          title="Send"
          color="#841584"
          accessibilityLabel="add deck"
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
function mapStateToProps({ decks }) {
  const decksArray = Object.values(decks).map(deck => deck);

  return {
    lastId: decksArray[decksArray.length - 1].key
  };
}
export default connect(mapStateToProps)(NewDeck);
