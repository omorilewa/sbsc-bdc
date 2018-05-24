import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { View } from 'react-native';
import { SubHeader, RateBoundariesForm } from '.';
import { RateBoundariesStyles as styles } from "../styles";

export class RateBoundariesPage extends Component {
  render() {
    return (
      <View style={styles.bg}>
        <SubHeader pageHeaderText="CONFIGURATION" settings />
        <RateBoundariesForm />
      </View>
    );
  }
}

const RateBoundaries = reduxForm({
  form: 'rateboundaries',
})(RateBoundariesPage);

export default RateBoundaries;
