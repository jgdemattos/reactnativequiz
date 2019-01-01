import React from "react";
import { View, Text, Button } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation";
import DeckList from "./DeckList";
import DeckOptions from "./DeckOptions";
import DeckPlay from "./DeckPlay";
import NewQuestion from "./NewQuestion";
import NewDeck from "./NewDeck";
import { connect } from "react-redux";
import { receiveDecks, receiveCards } from "../actions/index.js";

class HomeScreen extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(receiveDecks({ decks }));
    dispatch(receiveCards({ cards }));
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Deck List"
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "DeckList" })]
              })
            );
          }}
        />
      </View>
    );
  }
}
const decks = {
  "0": {
    key: "0",
    deckName: "my First Deck"
  },
  "1": {
    key: "1",
    deckName: "my SECOND Deck"
  },
  "2": {
    key: "2",
    deckName: "my TARD Deck"
  }
};
const cards = {
  "0": {
    key: "0",
    deck: "0",
    question: "qunto e 2+2",
    answer: "4"
  },
  "1": {
    key: "1",
    deck: "0",
    question: "qunto e 4+4",
    answer: "8"
  },
  "2": {
    key: "2",
    deck: "0",
    question: "qunto e 8+8",
    answer: "16"
  }
};

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: connect()(HomeScreen)
    },
    DeckList: {
      screen: DeckList
    },
    DeckOptions: {
      screen: DeckOptions
    },
    DeckPlay: {
      screen: DeckPlay
    },
    NewQuestion: {
      screen: NewQuestion
    },
    NewDeck: {
      screen: NewDeck
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
