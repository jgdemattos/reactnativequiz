import React from "react";
import DeckList from "./components/DeckList";
import { setLocalNotification } from "./utils/helper";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Header } from "react-native-elements";

const client = new ApolloClient({
  uri: "https://reactnativequizserver.herokuapp.com/graphql"
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <DeckList />
      </ApolloProvider>
    );
  }
}
