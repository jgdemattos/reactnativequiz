import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

class DeckItem extends React.Component {
  render() {
    const { deck, cardNum } = this.props;
    return (
      <ListItem
        style={styles.item}
        title={deck}
        badge={{
          value: cardNum,
          textStyle: { color: "yellow" },
          containerStyle: { marginTop: -5 }
        }}
        subtitle={"cards:" + cardNum}
        type="MaterialCommunityIcons"
        rightIcon={<Icon name="chevron-right" />}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 2,
    borderBottomColor: "#dddddd"
  }
});

export default DeckItem;
