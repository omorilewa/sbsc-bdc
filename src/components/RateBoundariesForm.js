import React, { PureComponent } from "react";
import { func } from "prop-types";
import { View, TouchableHighlight, ScrollView } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';

import { Label } from "native-base";
import { Field, reduxForm } from "redux-form";
import {
  LineInput,
  StyledText as Text,
} from ".";
import { RateBoundariesStyles as styles } from "../styles";
import { required, number } from '../util';

class RateBoundariesForm extends PureComponent {
  static propTypes = {
    handleSubmit: func,
  }

  state = {
    currency: 'USD',
    leastBuyRate: '',
    leastSellRate: '',
    greatestBuyRate: '',
    greatestSellRate: '',
  }

  onClickDropDown = (value) => {
    console.log('=====', value);
    this.setState(() => ({
      currency: value,
    }))
  }

  onSubmit = (values) => {
    const {
      leastBuyRate,
      leastSellRate,
      greatestBuyRate,
      greatestSellRate,
    } = values;

    console.log('===========>', values);

    this.setState(() => ({
      leastBuyRate,
      leastSellRate,
      greatestBuyRate,
      greatestSellRate,
    }), () => console.log('MANDEM'))

  }

  render() {
    const { onClickDropDown, onSubmit } = this;
    return (
      <View style={styles.main}>
        <ScrollView contentContainerStyle={styles.contentCon} keyboardShouldPersistTaps={'always'}>
          <Text style={styles.titleText}>Set Rate Boundaries:</Text>
          <View style={styles.modalView}>
            <Text style={styles.formLabel}>Select Currency: </Text>
            <View>
              <ModalDropdown ref={(el) => { this.dropDown = el }}
                options={["USD", "GBP", "YEN", "EUR"]}
                defaultValue={"USD"}
                style={styles.modal}
                textStyle={styles.pickerButton}
                dropdownStyle={styles.dropdown}
                dropdownTextStyle={styles.dropdownText}
                adjustFrame={(style) => {
                  style.height = 155;
                  style.top = 209;
                  return style;
                }}
                onSelect={(index, value) => { onClickDropDown(value) }}
              />
              <View style={styles.hr}></View>
            </View>
          </View>
          <View style={styles.fieldView}>
            <Label style={styles.formLabel}>Least Buy Rate:</Label>
            <Field
              name="leastBuyRate"
              style={styles.inputField}
              component={LineInput}
              placeholder="Enter rate"
              maxLength={3}
              validate={[required, number]}
            />
          </View>
          <View style={styles.fieldView}>
            <Label style={styles.formLabel}>Greatest Buy Rate:</Label>
            <Field
              name="greatestBuyRate"
              style={styles.inputField}
              component={LineInput}
              placeholder="Enter rate"
              maxLength={3}
              validate={[required, number]}
            />
          </View>
          <View style={styles.fieldView}>
            <Label style={styles.formLabel}>Least Sell Rate:</Label>
            <Field
              name="leastSellRate"
              style={styles.inputField}
              component={LineInput}
              placeholder="Enter rate"
              maxLength={3}
              validate={[required, number]}
            />
          </View>
          <View style={styles.fieldView}>
            <Label style={styles.formLabel}>Greatest Sell Rate:</Label>
            <Field
              name="greatestSellRate"
              style={styles.inputField}
              component={LineInput}
              placeholder="Enter rate"
              maxLength={3}
              validate={[required, number]}
            />
          </View>
          <TouchableHighlight style={styles.buttonBody} underlayColor="#19B01D" onPress={this.props.handleSubmit(values  => this.onSubmit(values))}>
            <Text style={styles.buttonText}>Save settings</Text>
          </TouchableHighlight>
          </ScrollView>
      </View>
        );
      }
    };

const withReduxForm = reduxForm({
          form: 'rate-boundaries'
      })

      export default withReduxForm(RateBoundariesForm);
