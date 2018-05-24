import React from "react";
import { View } from "react-native";
import { Time, StyledText as Text } from '.';
import { withUsername } from '../enhancers';
import { SuperHeaderStyles as styles } from '../styles';

const SuperHeader = ({ username }) => (
  <View style={styles.header}>
    <Time />
    <Text style={styles.headerText}>{username}</Text>
  </View>
);

export default withUsername(SuperHeader);
