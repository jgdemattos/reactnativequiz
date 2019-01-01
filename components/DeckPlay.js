import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { connect } from "react-redux";

class DeckPlay extends React.Component {
  state = {
    currentCard: 0,
    showAnswer: false,
    score: 0
  };
  render() {
    if (this.state.currentCard + 1 > this.props.selectedCards.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.result}>
            Score:{this.state.score + "/" + this.props.selectedCards.length}{" "}
          </Text>
          <View style={styles.menu}>
            <Button
              onPress={() =>
                this.setState({
                  score: 0,
                  currentCard: 0,
                  showAnswer: false
                })
              }
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
    return (
      <View style={styles.container}>
        <Text style={styles.numQuestions}>
          {this.state.currentCard + 1 + "/" + this.props.selectedCards.length}
        </Text>
        <Text>Question: </Text>
        <Text>{this.props.selectedCards[this.state.currentCard].question}</Text>
        <Button
          onPress={() => this.setState({ showAnswer: true })}
          title="show answer"
          color="#841584"
          accessibilityLabel="Play this deck"
        />
        {this.state.showAnswer && (
          <Text>{this.props.selectedCards[this.state.currentCard].answer}</Text>
        )}
        <View style={styles.menu}>
          <Button
            onPress={() =>
              this.setState({
                score: this.state.score + 1,
                currentCard: this.state.currentCard + 1,
                showAnswer: false
              })
            }
            title="Correct"
            color="green"
            accessibilityLabel="Play this deck"
          />
          <Button
            onPress={() =>
              this.setState({
                currentCard: this.state.currentCard + 1,
                showAnswer: false
              })
            }
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

function mapStateToProps({ cards }, { navigation }) {
  const selectedCards = Object.values(cards).filter(
    card => card.deck === navigation.state.params.entryId
  );
  return {
    selectedCards
  };
}

export default connect(mapStateToProps)(DeckPlay);
