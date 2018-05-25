import React, { PureComponent } from 'react'
import {
  oneOf,
  string,
  func,
} from "prop-types";
import { View } from "react-native";
import {
  Label,
  Picker,
  Icon,
  Item,
} from "native-base";
import { PeriodPickerStyles as styles } from "../styles";

class PeriodPicker extends PureComponent {
  static propTypes = {
    timeOfDay: oneOf(['Morning', 'Afternoon', 'Evening']).isRequired,
    selectedValue: string,
    onValueChange: func,
  }

  render() {
    const { timeOfDay, selectedValue, onValueChange } = this.props;

    return (
      <View style={styles.wrapper}>
        <Label style={styles.pickerLabel}>{`${timeOfDay}:`}</Label>
        <Item>
          <View style={styles.pickerSection}>
            <Icon
              name="md-stopwatch"
              style={styles.pickerIcon} />
              <Picker
                mode="dropdown"
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
              >
                <Picker.Item label="" value="mor" />
                <Picker.Item label="A" value="aft" />
                <Picker.Item label="E" value="evn" />
              </Picker>
          </View>
        </Item>
      </View>
    );
  }
};

export default PeriodPicker;
