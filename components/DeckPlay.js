import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class DeckPlay extends React.Component {
  render() {
    const deck = this.props.deck;
    return (
      <View style={styles.item}>
        <Text>{deck}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
export default DeckPlay;
