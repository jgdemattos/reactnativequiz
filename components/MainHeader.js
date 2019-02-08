import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Header, SearchBar, Icon } from "react-native-elements";
import { Constants } from "expo";

class MainHeader extends React.Component {
  state = {
    searchText: "",
    search: false
  };
  handleUpdateSearch = search => {
    this.props.updateSearch(search);
  };
  handleCancelSearch = () => {
    this.setState({ search: false });
    this.props.updateSearch("");
  };
  render() {
    return !this.state.search ? (
      <Header
        centerComponent={{ text: "MY QUIZ", style: { color: "#fff" } }}
        rightComponent={
          <Icon
            name="search"
            size={30}
            color="white"
            onPress={() => this.setState({ search: true })}
          />
        }
      />
    ) : (
      <View style={styles.search}>
        <SearchBar
          platform="android"
          cancelIcon={
            <Icon
              size={30}
              color="red"
              onPress={() => this.handleCancelSearch()}
              name="chevron-left"
            />
          }
          searchIcon={
            <Icon
              size={30}
              color="red"
              onPress={() => this.handleCancelSearch()}
              name="search"
            />
          }
          onChangeText={text => this.handleUpdateSearch(text)}
          placeholder="Search"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  search: {
    marginTop: Constants.statusBarHeight
  }
});
export default MainHeader;
