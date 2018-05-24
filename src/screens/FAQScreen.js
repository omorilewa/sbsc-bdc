import React, { Component } from 'react';
import { View } from 'react-native';
import { FAQPage } from '../components';

class FAQScreen extends Component {
  static navigationOptions = {
    title: 'faq',
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1}}>
        <FAQPage />
      </View>
    );
  }
}

export default FAQScreen;
