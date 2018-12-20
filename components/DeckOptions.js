import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

class DeckOptions extends React.Component {
  render() {
    return <View style={{ flex: 1 }} />;
  }
}
export default connect()(DeckOptions);
