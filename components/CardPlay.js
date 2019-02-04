import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Text, Icon } from "react-native-elements";

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
        <View style={styles.question}>
          <Text h4 style={styles.numQuestions}>
            {this.props.currentCard + 1 + "/" + this.props.length}
          </Text>
          <Text h4>Question: </Text>
          <Text h3>{this.props.card.question}</Text>
        </View>
        <View style={styles.flip}>
          <Icon
            name="rotate-right"
            raised
            type="font-awesome"
            color="#00aced"
            size={50}
            onPress={() => this.setState({ showAnswer: true })}
          />
          {this.state.showAnswer && <Text>{this.props.card.answer}</Text>}
        </View>
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
    alignItems: "center",
    alignContent: "space-between",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    marginBottom: 50,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 10,
    borderRadius: 10
  },
  question: {
    flex: 4,
    width: "100%"
  },
  flip: {
    flex: 4,
    justifyContent: "center"
  },
  menu: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: "100%"
  },
  numQuestions: {
    alignSelf: "flex-end"
  },
  result: {
    alignSelf: "center"
  }
});
export default CardPlay;
