import React from "react";
import HomeScreen from "./components/HomeScreen";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <HomeScreen />
      </Provider>
    );
  }
}
