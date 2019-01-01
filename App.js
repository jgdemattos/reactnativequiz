import React from "react";
import DeckList from "./components/DeckList";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { setLocalNotification } from "./utils/helper";

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <DeckList />
      </Provider>
    );
  }
}
