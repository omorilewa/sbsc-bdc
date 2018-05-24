import React, { Component } from "react";
import { func } from "prop-types";
import { View } from "react-native";
import { Label } from "native-base";
import { Field } from "redux-form";
import {
  LineInput,
  StyledButton as Button,
  StyledText as Text,
  PeriodPicker,
} from ".";
import { RateBoundariesStyles as styles } from "../styles";
import { required, number } from '../util';

class RateBoundariesForm extends Component {
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
            selectedValue={this.state.morningSelection}
            onValueChange={this.morningChange}
          />
          <PeriodPicker
            timeOfDay="Afternoon"
            selectedValue={this.state.afternoonSelection}
            onValueChange={this.afternoonChange}
          />
          <PeriodPicker
            timeOfDay="Evening"
            selectedValue={this.state.eveningSelection}
            onValueChange={this.eveningChange}
          />
        </View>
        <Button block rounded style={styles.buttonBody}>
          <Text style={styles.buttonText}>Save settings</Text>
        </Button>
      </View>
    );
  }
};

RateBoundariesForm.propTypes = {
  handleSubmit: func
};

export default RateBoundariesForm;
