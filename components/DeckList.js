import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button
} from "react-native";
import { connect } from "react-redux";
import DeckItem from "./DeckItem";
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation";
import DeckOptions from "./DeckOptions";
import DeckPlay from "./DeckPlay";
import NewQuestion from "./NewQuestion";
import NewDeck from "./NewDeck";
import { receiveDecks, receiveCards } from "../actions/index.js";

class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(receiveDecks({ decks }));
    dispatch(receiveCards({ cards }));
  }
  cards = {
    0: {
      deck: 0,
      cardQuestion: "whos good"
    }
  };

  render() {
    const { decks, cards } = this.props;
    if (!decks.length) {
      return <View style={styles.container} />;
    }

    return (
      <View style={styles.container}>
        {
          <FlatList
            data={decks}
            renderItem={({ item }) => {
              const cardNum = Object.values(cards).filter(
                card => card.deck === item.key
              );

              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("DeckOptions", {
                      entryId: item.key
                    })
                  }
                >
                  <DeckItem deck={item.deckName} cardNum={cardNum.length} />
                </TouchableOpacity>
              );
            }}
          />
        }
        <Button
          onPress={() => this.props.navigation.navigate("NewDeck", {})}
          title="New deck"
          color="#841584"
          accessibilityLabel="create new deck"
        />
      </View>
    );
  }
}

function mapStateToProps({ cards, decks, stackBar }) {
  return {
    decks: Object.values(decks).map(deck => deck),
    cards
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "stretch"
  }
});

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
    question: "quanto e 2+2",
    answer: "4"
  },
  "1": {
    key: "1",
    deck: "0",
    question: "quanto e 4+4",
    answer: "8"
  },
  "2": {
    key: "2",
    deck: "0",
    question: "quanto e 8+8",
    answer: "16"
  }
};

const AppNavigator = createStackNavigator(
  {
    DeckList: {
      screen: connect(mapStateToProps)(DeckList)
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
    initialRouteName: "DeckList"
  }
);

export default createAppContainer(AppNavigator);
