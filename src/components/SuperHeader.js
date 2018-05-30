import React, { Component } from "react";
import { View } from "react-native";
import { Time, StyledText as Text } from '.';
import { SuperHeaderStyles as styles } from '../styles';
import { getItem } from "../util";


class SuperHeader extends Component {
  state = {
    username: ''
  }

  async componentDidMount() {
    const username = await getItem('username');
    this.setState({ username })
  }

  render() {
    const { username } = this.state;
    return (
      <View style={styles.header}>
        <Time />
        <Text style={styles.headerText}>{username}</Text>
      </View>
    );
  }
};

export default SuperHeader;
