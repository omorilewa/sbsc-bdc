import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { StyledText as Text } from '.';
import { PrevRateStyles as styles } from "../styles";

class NoRates extends PureComponent {
  render() {
    return (
      <View style={styles.noRatesWrapper}>
        <Text style={styles.noRatesText}>No rates available.</Text>
      </View>
    );
  }
}

export default NoRates;
