import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Query } from "react-apollo";
import { GET_ALL_CARDS } from "../queries";
import EndGameView from "./EndGameView";
import CardPlay from "./CardPlay";

class DeckPlay extends React.Component {
  state = {
    currentCard: 0,
    showAnswer: false,
    score: 0
  };

  updateScoreAndCurrentCard = (score, currentCard) => {
    this.setState({
      score,
      currentCard
    });
  };
  reset = () => {
    this.setState({
      score: 0,
      currentCard: 0
    });
  };
  render() {
    return (
      <Query query={GET_ALL_CARDS}>
        {({ data, loading, error }) => {
          if (loading) return <Text>Loading</Text>;
          if (error) return <Text>Error</Text>;
          cards = data.getAllCards;
          if (!cards.length) {
            return <View style={styles.container} />;
          }
          const selectedCards = Object.values(cards).filter(
            card => card.deckId === this.props.navigation.state.params.entryId
          );

          return this.state.currentCard + 1 > selectedCards.length ? (
            <EndGameView
              score={this.state.score}
              length={selectedCards.length}
              navigation={this.props.navigation}
              reset={this.reset}
            />
          ) : (
            <View style={styles.container}>
              <CardPlay
                currentCard={this.state.currentCard}
                score={this.state.score}
                card={selectedCards[this.state.currentCard]}
                length={selectedCards.length}
                updateScoreAndCurrentCard={this.updateScoreAndCurrentCard}
              />
            </View>
          );
        }}
      </Query>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#dddddd"
  }
});

export default DeckPlay;
