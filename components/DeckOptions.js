import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Text, Button, Icon, Card } from "react-native-elements";

import { Query, Mutation } from "react-apollo";
import { GET_DECK, DELETE_DECK, GET_ALL_DECKS } from "../queries";
import { Col, Row, Grid } from "react-native-easy-grid";

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
        duration: 3000 // Make it take a while
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
  handleDeleteDeck = deleteDeck => {
    deleteDeck().then(({ data }) => {
      this.props.navigation.navigate("DeckList");
    });
  };
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
            const cardNum = Object.values(cards).filter(
              card => card.deckId === this.props.navigation.state.params.entryId
            ).length;
            return (
              <FadeInView style={styles.fade}>
                <Card style={styles.card} title={deck.name}>
                  <Text>{"Number of cards: " + cardNum}</Text>
                </Card>

                <Grid>
                  <Col>
                    <Row
                      style={styles.singleRow}
                      style={{
                        flex: 1,
                        flexDirection: "row"
                      }}
                    >
                      <Col
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          flexDirection: "column"
                        }}
                      >
                        <View style={styles.iconBack}>
                          <Icon
                            name="play-circle-filled"
                            size={135}
                            color="green"
                            title="sdfds"
                            onPress={() =>
                              this.props.navigation.navigate("DeckPlay", {
                                entryId: deck._id
                              })
                            }
                          />
                          <Text>Play this deck</Text>
                        </View>
                      </Col>
                    </Row>
                    <Row style={styles.doubleRow}>
                      <Col style={styles.doubleColLeft}>
                        <View style={styles.iconBack}>
                          <Icon
                            name="add"
                            size={90}
                            color="blue"
                            title="sdfds"
                            onPress={() =>
                              this.props.navigation.navigate("NewQuestion", {
                                entryId: deck._id
                              })
                            }
                          />
                          <Text>Add a card</Text>
                        </View>
                      </Col>
                      <Col style={styles.doubleColRight}>
                        <View style={styles.iconBack}>
                          <Mutation
                            mutation={DELETE_DECK}
                            variables={{ _id: deck._id }}
                            update={(cache, { data: { deleteDeck } }) => {
                              const {
                                getAllDecks,
                                getAllCards
                              } = cache.readQuery({
                                query: GET_ALL_DECKS
                              });
                              cache.writeQuery({
                                query: GET_ALL_DECKS,
                                data: {
                                  getAllDecks: getAllDecks.filter(
                                    deck => deck._id !== deleteDeck._id
                                  ),
                                  getAllCards
                                }
                              });
                            }}
                          >
                            {deleteDeck => {
                              return (
                                <Icon
                                  name="delete"
                                  size={90}
                                  color="red"
                                  title="sdfds"
                                  onPress={() =>
                                    this.handleDeleteDeck(deleteDeck)
                                  }
                                />
                              );
                            }}
                          </Mutation>
                          <Text>Delete this deck</Text>
                        </View>
                      </Col>
                    </Row>
                  </Col>
                </Grid>
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
    flex: 1
  },
  fade: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "stretch",
    margin: 0,
    padding: 0,
    backgroundColor: "#dddddd"
  },
  card: {
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    margin: 15,
    padding: 15,
    backgroundColor: "#ffffff"
  },
  doubleRow: {},
  doubleColLeft: {
    //backgroundColor: "blue"
    height: 180
  },
  doubleColRight: {
    //backgroundColor: "red"
    height: 180
  },
  singleRow: {
    //backgroundColor: "green",
  },
  icon: {},
  iconBack: {
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    margin: 15,
    padding: 15,
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    height: null
  }
});

export default DeckOptions;
