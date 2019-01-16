import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button
} from "react-native";

import { Query } from "react-apollo";
import { GET_ALL_DECKS } from "../queries";

class TestView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>aqui</Text>
        <Query query={GET_ALL_DECKS}>
          {({ data, loading, error }) => {
            if (loading) return <Text>Loading</Text>;
            if (error) return <Text>Error</Text>;
            console.log(data);
            return <Text>Decks</Text>;
          }}
        </Query>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "stretch",
    paddingTop: 100
  }
});

export default TestView;
