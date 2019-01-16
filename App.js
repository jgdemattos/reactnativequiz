import React from "react";
import TestView from "./components/TestView";
import DeckList from "./components/DeckList";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { setLocalNotification } from "./utils/helper";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://192.168.100.4:4444/graphql"
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
