import React from 'react';
import { View } from 'react-native';
import { string } from 'prop-types';
import { StyledText as Text } from '.';
import { PrevRateStyles as styles } from '../styles';

const ErrorComponent = ({ errorText }) => (
  <View style={styles.errorView}>
    <Text style={styles.errorString}>{errorText}</Text>
  </View>
);

ErrorComponent.propTypes = {
  errorText: string.isRequired,
}

export default ErrorComponent;
