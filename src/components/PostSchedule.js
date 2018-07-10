import React, { PureComponent, Fragment } from 'react';
import { func } from "prop-types";
import { Mutation } from 'react-apollo';
import moment from 'moment';
import {
  View,
  ScrollView,
  TouchableHighlight,
  TimePickerAndroid,
  ActivityIndicator
} from 'react-native';
import { Input, Item } from "native-base";
import { showMessage } from "react-native-flash-message";
import { UPDATE_PERIOD, UPDATE_COMP_DELAY } from '../util';
import { SubHeader, StyledText as Text, PeriodPicker } from '.';
import { RateBoundariesStyles as styles } from "../styles";

const initialState = {
  presetHour: 1,
  presetMinute: 0,
  morningSelection: {},
  afternoonSelection: {},
  eveningSelection: {},
  rawMoment: {
    MORNING: '',
    AFTERNOON: '',
    EVENING: '',
  },
  isValid: true,
  isEmpty: false,
  MORNING: '',
  AFTERNOON: '',
  EVENING: '',
}

class PostSchedule extends PureComponent {
  static propTypes = {
    handleSubmit: func,
  }

  state = { ...initialState, textValue: '' }

  _formatTime = (hour, minute) => {
    const normalizedMinute = minute < 10 ? '0' + minute : minute;
    return moment(hour + normalizedMinute, "hmm").format('LT');
  }

  _timeOnly = (hour, minute) => {
    const minuteChecked = minute < 10 ? "" + 0 + minute : minute;
    const time = "" + hour + minuteChecked;
    return moment(time, "hmm").toISOString();
  }

  _validateSchedule = (timeArray) => {
    let check = true;
    for (let index = 0; index < timeArray.length - 1; index += 1) {
      if (timeArray[index + 1] <= timeArray[index]) {
        check = false;
      }
    }
    this.setState(() => ({ isValid: check }));
    return check
  }

  _validateDelayPeriod = (textValue) => {
    this.setState(() => ({ isEmpty: false }))
    let check = true;
    if (isNaN(textValue)) {
      return;
    }

    this.setState(() => ({ textValue }));
    return check
  }

  onSubmit = () => {
    const { textValue } = this.state;
    let empty = false
    if (!textValue) {
      empty = true;
      this.setState(() => ({ isEmpty: true, textValue }));
      return empty;
    }
    return empty;
  }

  clearForm = () => {
    this.setState(() => (initialState))
    showMessage({
      message: "Schedule successfully updated",
      type: "success",
      backgroundColor: "#19B01D"
    });
  }

  clearDelayPeriod = () => {
    this.setState(() => ({ textValue: '' }));
    showMessage({
      message: "Schedule successfully updated",
      type: "success",
      backgroundColor: "#19B01D"
    });
  }

  showError = () => {
    showMessage({
      message: "An error occured. Retry.",
      type: "danger",
      backgroundColor: "red"
    });
  }

  showPicker = async (periodOfDay) => {
    try {
      const { presetHour, presetMinute, rawMoment } = this.state;
      const options = {
        hour: presetHour,
        minute: presetMinute,
      }
      const { action, minute, hour } = await TimePickerAndroid.open(options);
      rawMoment[periodOfDay] = this._timeOnly(hour, minute);
      if (action === TimePickerAndroid.timeSetAction) {
        this.setState(() => ({
          [periodOfDay]: this._formatTime(hour, minute),
          isValid: true,
          rawMoment,
          [periodOfDay + '_ITEMS']: {
            period: periodOfDay,
            time: this._timeOnly(hour, minute).split('T').pop()
          }
        }));
      } else if (action === TimePickerAndroid.dismissedAction) {
        console.log('Modal Dismissed');
      }
    } catch ({ code, message }) {
      console.log(`Error in '${periodOfDay}': `, message);
    }
  }

  render() {
    const {
      state: {
        MORNING,
        AFTERNOON,
        EVENING,
        MORNING_ITEMS,
        AFTERNOON_ITEMS,
        EVENING_ITEMS,
        rawMoment,
        isValid,
        textValue,
        isEmpty,
      },
      showPicker, _validateSchedule, _validateDelayPeriod, onSubmit, clearDelayPeriod, showError } = this;
    const timeArray = [rawMoment.MORNING, rawMoment.AFTERNOON, rawMoment.EVENING]
    return (
      <View style={styles.wrapperView}>
        <SubHeader pageHeaderText="POST SCHEDULE" settings />
        <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps={'always'}>
          <Text style={styles.postScheduleText}>Post Schedule:</Text>
          <View style={styles.pickersView}>
            <View style={styles.timePicker}>
              <TouchableHighlight underlayColor="white" onPress={() => showPicker('MORNING')}>
                <PeriodPicker timeOfDay={'Morning'} selectedValue={MORNING} />
              </TouchableHighlight>
            </View>
            <View style={styles.timePicker}>
              <TouchableHighlight underlayColor="white" onPress={() => showPicker('AFTERNOON')}>
                <PeriodPicker timeOfDay={'Afternoon'} selectedValue={AFTERNOON} />
              </TouchableHighlight>
            </View>
            <View style={styles.timePicker}>
              <TouchableHighlight onPress={() => showPicker('EVENING')}>
                <PeriodPicker timeOfDay={'Evening'} selectedValue={EVENING} />
              </TouchableHighlight>
            </View>
          </View>
          <Mutation mutation={UPDATE_PERIOD} onError={showError} onCompleted={this.clearForm}>
            {(changePeriod, { loading, error }) => {
              return (
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <TouchableHighlight
                    underlayColor="#19B01D"
                    style={styles.buttonBody}
                    onPress={() => {
                      const truthyTimePeriods = [MORNING_ITEMS, AFTERNOON_ITEMS, EVENING_ITEMS].filter(Boolean);
                      if (truthyTimePeriods.length < 3) {
                        console.log(truthyTimePeriods)
                        return;
                      }
                      let check = true;
                      check = _validateSchedule(timeArray);
                      if (!check) {
                        return;
                      }

                      return changePeriod({
                        variables: { timePeriods: truthyTimePeriods },
                      })
                    }
                    }
                  >
                    <Fragment>
                      {!loading && <Text style={styles.buttonText}>Save settings</Text>}
                      {loading && <View style={styles.spinner}>
                        <ActivityIndicator
                          size="large"
                          color="white"
                        />
                      </View>}
                    </Fragment>
                  </TouchableHighlight>
                  {!isValid && <Text style={styles.errorText}>Whoops! Order of the rates is wrong. Check and re-enter the rates.</Text>}
                </View>
              );
            }}
          </Mutation>
          <Text style={[styles.postScheduleText, styles.compSchedule]}>Computation Schedule Setting:</Text>
          <Text style={styles.comp}>Computation Delay Period (InMinutes):</Text>
          <View style={styles.input}>
            <Item style={styles.blackborder}>
              <Input
                style={styles.inputField}
                value={textValue}
                onChangeText={_validateDelayPeriod}
                placeholder={'Enter time'}
                placeholderTextColor="#D1D1D1"
                keyboardType={'numeric'}
              />
            </Item>
          </View>
          <Mutation mutation={UPDATE_COMP_DELAY} onError={showError} onCompleted={clearDelayPeriod}>
            {(changeDelay, { data, loading, error }) => {
              return (
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <TouchableHighlight
                    underlayColor="#19B01D"
                    style={styles.buttonBody}
                    onPress={() => {
                      const shouldSubmit = onSubmit();
                      if (shouldSubmit) {
                        return;
                      }

                      return changeDelay({
                        variables: { compDelay: textValue },
                      })
                    }
                    }
                  >
                    <Fragment>
                      {!loading && <Text style={styles.buttonText}>Save settings</Text>}
                      {loading && <View style={styles.spinner}>
                        <ActivityIndicator
                          size="large"
                          color="white"
                        />
                      </View>}
                    </Fragment>
                  </TouchableHighlight>
                  {isEmpty && <Text style={styles.errorText}>Fields must have a value.</Text>}
                </View>
              );
            }}
          </Mutation>
        </ScrollView>
      </View>)
  }
}

export default PostSchedule;
