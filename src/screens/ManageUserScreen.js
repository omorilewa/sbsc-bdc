import React, { Component } from 'react';
import { View } from 'react-native';
import {
  TabNavigator,
  ManageUsersPage,
  CreateUserPage,
  SuperHeader,
} from '../components';
import { NewRateStyles as styles } from '../styles';

class ManageUserScreen extends Component {
  static navigationOptions = {
    title: 'manageUsers',
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <SuperHeader />
        <View style={styles.flex}>
          <TabNavigator
            initialRouteName={'TabOne'}
            screenOne={CreateUserPage}
            screenTwo={ManageUsersPage}
          />
        </View>
      </View>
    );
  }
}

export default ManageUserScreen;
