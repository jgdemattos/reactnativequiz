import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button
} from "react-native";
import DeckItem from "./DeckItem";
import { createAppContainer, createStackNavigator } from "react-navigation";
import DeckOptions from "./DeckOptions";
import DeckPlay from "./DeckPlay";
import NewQuestion from "./NewQuestion";
import NewDeck from "./NewDeck";

import { Query } from "react-apollo";
import { GET_ALL_DECKS } from "../queries";
import MainHeader from "./MainHeader";

class DeckList extends React.Component {
  state = {
    search: ""
  };
  updateSearch = search => {
    console.log(search);
    this.setState({ search });
  };
  componentDidMount() {
    this.props.navigation.setParams({ updateSearch: this.updateSearch });
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: <MainHeader updateSearch={navigation.getParam("updateSearch")} />,
      headerStyle: {
        backgroundColor: "transparent"
      }
      /*       header: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color="#fff"
        />
      ), */
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Query query={GET_ALL_DECKS}>
          {({ data, loading, error }) => {
            if (loading) return <Text>Loading</Text>;
            if (error) return <Text>Error</Text>;
            decks = data.getAllDecks;
            cards = data.getAllCards;
            if (!decks.length) {
              return <View style={styles.container} />;
            }

            return (
              <FlatList
                extraData={this.state}
                data={decks}
                style={styles.list}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => {
                  const cardNum = Object.values(cards).filter(
                    card => card.deckId === item._id
                  ).length;
                  if (this.state.search != "") {
                    if (item.name.indexOf(this.state.search) == -1) {
                      return null;
                    }
                  }
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("DeckOptions", {
                          entryId: item._id
                        })
                      }
                    >
                      <DeckItem deck={item.name} cardNum={cardNum} />
                    </TouchableOpacity>
                  );
                }}
              />
            );
          }}
        </Query>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    flexDirection: "column",
    alignItems: "stretch"
  }
});

const AppNavigator = createStackNavigator(
  {
    DeckList: {
      screen: DeckList
      /*      navigationOptions: {
        header: <MainHeader />,
        headerStyle: {
          backgroundColor: "transparent"
        }
      } */
    },
    DeckOptions: {
      screen: DeckOptions,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#2089dc"
        }
      }
    },
    DeckPlay: {
      screen: DeckPlay,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#2089dc"
        }
      }
    },
    NewQuestion: {
      screen: NewQuestion,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#2089dc"
        }
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "#2089dc"
        }
      }
    }
  },
  {
    initialRouteName: "DeckList"
  }
);

export default createAppContainer(AppNavigator);
