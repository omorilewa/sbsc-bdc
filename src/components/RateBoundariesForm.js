import React, { PureComponent } from "react";
import { func } from "prop-types";
import { View, TouchableHighlight } from "react-native";
import { Label } from "native-base";
import { Field } from "redux-form";
import {
  LineInput,
  StyledText as Text,
  PeriodPicker,
} from ".";
import { RateBoundariesStyles as styles } from "../styles";
import { required, number } from '../util';

class RateBoundariesForm extends PureComponent {
  static propTypes = {
    handleSubmit: func,
  }

  state = {
    morningSelection: "",
    afternoonSelection: "",
    eveningSelection: ""
  }

  morningChange = (value) => {
    this.setState((state) => {
      return {
        morningSelection: value
      }
    })
  }

  afternoonChange = (value) => {
    this.setState((state) => {
      return {
        afternoonSelection: value
      }
    })
  }

  eveningChange = (value) => {
    this.setState((state) => {
      return {
        eveningSelection: value
      }
    })
  }

  render() {
    const {
      state: { morningSelection, afternoonSelection, eveningSelection },
      eveningChange, afternoonChange, morningChange } = this;

    return (
      <View style={styles.main}>
        <Text style={styles.titleText}>Set Rate Boundaries:</Text>
        <View style={styles.fieldView}>
          <Label style={styles.formLabel}>Least:</Label>
          <Field
            name="least-rate"
            style={styles.inputField}
            component={LineInput}
            placeholder="Enter rate"
            maxLength={3}
            validate={[required, number]}
          />
        </View>
        <View style={styles.fieldView}>
          <Label style={styles.formLabel}>Greatest:</Label>
          <Field
            name="greatest-rate"
            style={styles.inputField}
            component={LineInput}
            placeholder="Enter rate"
            maxLength={3}
            validate={[required, number]}
          />
        </View>
        <Text style={styles.postScheduleText}>Post Schedule:</Text>
        <View style={styles.pickersView}>
          <PeriodPicker
            timeOfDay="Morning"
            selectedValue={morningSelection}
            onValueChange={morningChange}
          />
          <PeriodPicker
            timeOfDay="Afternoon"
            selectedValue={afternoonSelection}
            onValueChange={afternoonChange}
          />
          <PeriodPicker
            timeOfDay="Evening"
            selectedValue={eveningSelection}
            onValueChange={eveningChange}
          />
        </View>
        <TouchableHighlight style={styles.buttonBody} underlayColor="#19B01D">
          <Text style={styles.buttonText}>Save settings</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

export default RateBoundariesForm;
