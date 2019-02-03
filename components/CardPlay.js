import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Header, SearchBar, Icon } from "react-native-elements";
import { Constants } from "expo";

class CardPlay extends React.Component {
  state = {
    showAnswer: false
  };
  handleUpdateScoreAndCurrentCard = correct => {
    this.props.updateScoreAndCurrentCard(
      this.props.score + (correct ? 1 : 0),
      this.props.currentCard + 1
    );
    this.setState({
      showAnswer: false
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.numQuestions}>
          {this.props.currentCard + 1 + "/" + this.props.length}
        </Text>
        <Text>Question: </Text>
        <Text>{this.props.card.question}</Text>
        <Button
          onPress={() => this.setState({ showAnswer: true })}
          title="show answer"
          color="#841584"
          accessibilityLabel="Play this deck"
        />
        {this.state.showAnswer && <Text>{this.props.card.answer}</Text>}
        <View style={styles.menu}>
          <Button
            onPress={() => this.handleUpdateScoreAndCurrentCard(true)}
            title="Correct"
            color="green"
            accessibilityLabel="Play this deck"
          />
          <Button
            onPress={() => this.handleUpdateScoreAndCurrentCard(false)}
            title="Incorrect"
            color="red"
            accessibilityLabel="Play this deck"
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
export default CardPlay;
