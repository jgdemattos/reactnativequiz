import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button
} from "react-native";
import { connect } from "react-redux";
import DeckItem from "./DeckItem";

class DeckList extends React.Component {
  cards = {
    0: {
      deck: 0,
      cardQuestion: "whos good"
    }
  };

  render() {
    const decks = this.props.decks;
    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("DeckOptions", {
                    entryId: item.key
                  })
                }
              >
                <DeckItem deck={item.deckName} />
              </TouchableOpacity>
            );
          }}
        />
        <Button
          onPress={() => this.props.navigation.navigate("NewDeck", {})}
          title="New deck"
          color="#841584"
          accessibilityLabel="create new deck"
        />
      </View>
    );
  }
}

function mapStateToProps({ decks, stackBar }) {
  return {
    navigationState: stackBar,
    decks: decks ? Object.values(decks).map(deck => deck) : null
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "stretch"
  }
});

export default connect(mapStateToProps)(DeckList);
