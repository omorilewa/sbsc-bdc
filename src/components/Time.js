import React from 'react';
import { View } from 'react-native';
import moment from 'moment';
import { StyledText as Text} from './StyledText';
import { TimeStyles as styles } from '../styles';

export default class Time extends React.Component {
  state = {
    curTime: moment(new Date()).format("ddd   DD-MMM-YY  hh:mm a")
  }

  componentDidMount() {
    this.timer = setInterval( () => {
      this.setState({
        curTime : moment(new Date()).format("ddd   DD-MMM-YY  hh:mm a")
      })
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>{this.state.curTime}</Text>
      </View>
    );
  }
}
