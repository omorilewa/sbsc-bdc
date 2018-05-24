import React, { Component } from "react";
import { View } from "react-native";
import { Label } from "native-base";
import { Field, reduxForm } from "redux-form";
import { LineInput } from ".";
import { FAQModalFormStyles as styles } from '../styles';
import { required } from '../util';

class FAQModalForm extends Component {
  render() {
    return (
      <View style={styles.formView}>
        <View style={styles.fieldView}>
          <Label style={styles.formLabel}>Tell us your name: </Label>
          <Field
            name="name"
            style={styles.inputField}
            component={LineInput}
            validate={[required]}
          />
        </View>
        <View style={styles.fieldView}>
          <Label style={styles.formLabel}>Email Address: </Label>
          <Field
            name="email"
            style={styles.inputField}
            component={LineInput}
            validate={[required]}
          />
        </View>
        <View style={styles.fieldView}>
          <Label style={styles.formLabel}>Subject: </Label>
          <Field
            name="subject"
            style={styles.inputField}
            component={LineInput}
            validate={[required]}
          />
        </View>
        <View style={styles.fieldView}>
          <Label style={styles.formLabel}>Describe the problem you encountered here: </Label>
          <Field
            name="problem"
            style={styles.inputField}
            component={LineInput}
            validate={[required]}
          />
        </View>
      </View>
    );
  }
};

FAQModalForm = reduxForm({
  form: 'faq-modal'
})(FAQModalForm)

export default FAQModalForm;
