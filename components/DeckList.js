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
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("DeckOptions", {
                    entryId: item.key
                  })
                }
              >
                <DeckItem deck={item.key} />
              </TouchableOpacity>
            );
          }}
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
  }
});

export default connect(mapStateToProps)(DeckList);
