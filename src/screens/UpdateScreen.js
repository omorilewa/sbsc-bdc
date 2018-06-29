import React, { Component } from 'react';
import { Update } from '../components';

class UpdateScreen extends Component {
  static navigationOptions = {
    title: 'Update',
  };

  render() {
    return (
      <Update />
    )
  }
}

export default UpdateScreen;
