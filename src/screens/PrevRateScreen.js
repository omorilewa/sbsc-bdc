import React, { Component } from 'react';
import { View } from 'react-native';
import {
  TabNavigator,
  SuperHeader,
  NewRatePage,
  PrevRatePage
} from '../components';
import { NewRateStyles as styles } from '../styles';

export class PrevRateScreen extends Component {
  static navigationOptions = {
    title: 'prevRate',
  };

  render() {
    return (
      <View style={styles.flex}>
        <SuperHeader />
        <View style={styles.flex}>
          <TabNavigator
            initialRouteName={'TabTwo'}
            screenOne={NewRatePage}
            screenTwo={PrevRatePage}
          />
        </View>
       </View>
    );
  }
}
