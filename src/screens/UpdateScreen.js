import React, { Component } from 'react';
import { Update } from '../components';
import { View } from 'react-native';

class UpdateScreen extends Component {
  static navigationOptions = {
    title: 'Update',
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white',  flex: 1}}>
        <Update />
      </View>
    )
  }
}

export default UpdateScreen;
