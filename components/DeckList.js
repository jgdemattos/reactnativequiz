import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
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
          renderItem={({ item }) => <DeckItem deck={item.key} />}
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
    flexDirection: "row",
    alignItems: "stretch"
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    borderRadius: 2,
    backgroundColor: "white",
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
    marginBottom: 8,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3
  }
});

export default connect(mapStateToProps)(DeckList);
