import React from "react";
import HomeScreen from "./components/HomeScreen";
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
        <HomeScreen />
      </Provider>
    );
  }
}
