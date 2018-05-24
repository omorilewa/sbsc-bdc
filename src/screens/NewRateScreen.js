import React, { Component } from 'react';
import { View } from 'react-native';
import {
  TabNavigator,
  SuperHeader,
  NewRatePage,
  PrevRatePage
} from '../components';
import { NewRateStyles as styles } from '../styles';

export class NewRateScreen extends Component {
  static navigationOptions = {
    title: 'newRate',
  };

  render() {
    return (
       <View style={styles.wrapper}>
          <SuperHeader />
          <View style={styles.flex}>
            <TabNavigator
              initialRouteName={'TabOne'}
              screenOne={NewRatePage}
              screenTwo={PrevRatePage}
            />
          </View>
       </View>
    );
  }
}

