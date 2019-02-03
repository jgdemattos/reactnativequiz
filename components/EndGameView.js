import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Header, SearchBar, Icon } from "react-native-elements";
import { Constants } from "expo";

class EndGameView extends React.Component {
  state = {
    searchText: "",
    search: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>
          Score:{this.props.score + "/" + this.props.length}
        </Text>
        <View style={styles.menu}>
          <Button
            onPress={this.props.reset}
            title="Restart quiz"
            color="green"
          />
          <Button
            onPress={() =>
              this.props.navigation.navigate("DeckOptions", {
                entryId: this.props.navigation.state.params.entryId
              })
            }
            title="Beck to deck"
            color="blue"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  numQuestions: {
    alignSelf: "flex-end"
  },
  result: {
    alignSelf: "center"
  }
});
export default EndGameView;
