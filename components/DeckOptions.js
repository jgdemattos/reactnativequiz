import React from "react";
import { Animated, StyleSheet, View, Text, Button } from "react-native";

import { Query } from "react-apollo";
import { GET_DECK } from "../queries";

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 4000 // Make it take a while
      }
    ).start(); // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class DeckOptions extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Query
          query={GET_DECK}
          variables={{ _id: this.props.navigation.state.params.entryId }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Text>Loading</Text>;
            if (error) return <Text>Error</Text>;
            deck = data.getDeck;
            cards = data.getAllCards;
            //cardNum = data.getCardsOf.length;
            const cardNum = Object.values(cards).filter(
              card => card.deckId === this.props.navigation.state.params.entryId
            ).length;
            return (
              <FadeInView style={styles.fade}>
                <Text>{deck.deckName}</Text>
                <Text>{"number of cards: " + cardNum}</Text>
                <Button
                  style={styles.item}
                  onPress={() =>
                    this.props.navigation.navigate("NewQuestion", {
                      entryId: deck._id
                    })
                  }
                  title="Create New Question"
                  color="#CCC"
                  accessibilityLabel="Edit this deck"
                />
                <Button
                  style={styles.item}
                  onPress={() =>
                    this.props.navigation.navigate("DeckPlay", {
                      entryId: deck._id
                    })
                  }
                  title="Start a Quiz"
                  color="#841584"
                  accessibilityLabel="Play this deck"
                />
              </FadeInView>
            );
          }}
        </Query>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  fade: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "powderblue"
  },
  item: {
    padding: 20,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 80,
    marginBottom: 80,
    elevation: 3
  }
});

export default DeckOptions;
