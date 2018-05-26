import React from 'react';
import { View } from 'react-native';
import { StyledText as Text } from '.';
import { UserListStyles as styles } from '../styles';

const UsersTableHeader = () => (
  <View style={[styles.itemContainer, styles.tableHeader]}>
    <View style={styles.numTextView}>
      <Text style={styles.headerText}>#</Text>
    </View>
    <View style={[styles.noGaps, styles.nameColumn]}>
      <Text style={styles.headerText}>Name</Text>
    </View>
    <View style={[styles.noGaps, styles.usernameColumn]}>
      <Text style={styles.headerText}>Username</Text>
    </View>
    <View style={[styles.noGaps, styles.actionView]}>
      <Text style={styles.headerText}>Role</Text>
    </View>
    <View style={[styles.noGaps, styles.actionView]}>
      <Text style={styles.headerText}>Status</Text>
    </View>
    <View style={[styles.noGaps, styles.actionView]}>
      <Text style={styles.headerText}>Action</Text>
    </View>
  </View>
);

export default UsersTableHeader;
