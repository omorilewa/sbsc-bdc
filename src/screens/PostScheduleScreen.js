import React, { Component } from 'react';
import { PostSchedule } from '../components';
import { View } from 'react-native';

class PostScheduleScreen extends Component {
  static navigationOptions = {
    title: 'Update',
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <PostSchedule />
      </View>
    )
  }
}

export default PostScheduleScreen;
