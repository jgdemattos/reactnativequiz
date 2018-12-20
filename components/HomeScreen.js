import React from "react";
import { View, Text, Button } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json
import DeckList from "./DeckList";
import { connect } from "react-redux";
import { receiveDecks } from "../actions/index.js";
class HomeScreen extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(receiveDecks({ decks }));
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Details" })]
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
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: connect()(HomeScreen)
    },
    Details: {
      screen: DeckList
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
