import React, { PureComponent } from 'react'
import {
  oneOf,
  string,
  func,
} from "prop-types";
import { View } from "react-native";
import { StyledText as Text } from '.';

import {
  Label,
  Icon,
} from "native-base";
import { PeriodPickerStyles as styles } from "../styles";

class PeriodPicker extends PureComponent {
  static propTypes = {
    timeOfDay: oneOf(['Morning', 'Afternoon', 'Evening']).isRequired,
    selectedValue: string,
    onValueChange: func,
  }

  render() {
    const { timeOfDay, selectedValue } = this.props;

    return (
      <View style={styles.wrapper}>
        <Label style={styles.pickerLabel}>{`${timeOfDay}:`}</Label>
        <View style={styles.pickerSection}>
          <Icon
            name="md-stopwatch"
            style={styles.pickerIcon} />
          <View style={styles.textView}>
            <Text style={styles.timeDisplay}>{selectedValue}</Text>
          </View>
        </View>
      </View>
    );
  }
};

export default PeriodPicker;
