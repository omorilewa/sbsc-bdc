import React, { PureComponent, Fragment } from "react";
import { func } from "prop-types";
import { View, TouchableHighlight, ScrollView, ActivityIndicator } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import { Mutation, Query } from 'react-apollo';
import { showMessage } from "react-native-flash-message";
import { Label } from "native-base";
import { Field, reduxForm } from "redux-form";
import {
  LineInput,
  StyledText as Text,
  ErrorComponent
} from ".";
import { RateBoundariesStyles as styles } from "../styles";
import { required, number, UPDATE_RATE_BOUNDARIES, GET_LOCATION, sortLocation, locationId } from '../util';

const initialState = {
  currency: 'USD',
  location: 'Lagos',
  LOCATION_ID: '',
}
class RateBoundariesForm extends PureComponent {
  static propTypes = {
    handleSubmit: func,
  }

  state = { ...initialState }

  showError = (error) => {
    showMessage({
      message: "An error occured. Retry.",
      type: "danger",
      backgroundColor: "red"
    });
  }

  onClickDropDown = (value) => {
    this.setState(() => ({
      currency: value,
    }))
  }

  handleLocationDropDown = (value) => {
    this.setState(() => ({
      location: value,
    }))
  }

  getLocationId = (data) => {
    const { location } = this.state;
    const LOCATION_ID = locationId(data, location)
    this.setState(() => ({
      LOCATION_ID
    }))
    return LOCATION_ID;
  }

  clearForm = () => {
    this.props.reset('rate-boundaries');
    this.setState(() => (initialState))
    showMessage({
      message: "Schedule successfully updated",
      type: "success",
      backgroundColor: "#19B01D"
    });
  }

  onSubmit = () => {
    const { LOCATION_ID } = this.state;
    if(!LOCATION_ID) {
      showMessage({
        message: "Retry",
        type: "danger",
        backgroundColor: "red"
      });
      return false;
    }
    return true;
  }

  render() {
    const {
      onClickDropDown,
      onSubmit,
      handleLocationDropDown,
      showError,
      clearForm,
      getLocationId,
      state: {
        currency,
        LOCATION_ID
      },
      props: {
        handleSubmit
      }
    } = this;
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
              name="buyRateLowerLimit"
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
              name="buyRateUpperLimit"
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
              name="sellRateLowerLimit"
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
              name="sellRateUpperLimit"
              style={styles.inputField}
              component={LineInput}
              placeholder="Enter rate"
              maxLength={3}
              validate={[required, number]}
            />
          </View>
          <Query query={GET_LOCATION}>
            {({ loading, error, data }) => {
              if (loading) return (
                <View style={styles.modalBackground}>
                  <View style={styles.spinner}>
                    <ActivityIndicator
                      size="large"
                      color="#9c9e9f" />
                  </View>
                </View>
              )
              if (error) {
                return <ErrorComponent errorText="Unable to retrieve data" />
              }
              const locations = sortLocation(data.locations)
              getLocationId(data)
              return (
                <View style={styles.modalView}>
                  <Text style={styles.formLabel}>Select Location: </Text>
                  <View>
                    <ModalDropdown ref={(el) => { this.dropDown = el }}
                      options={locations}
                      defaultValue={locations[0]}
                      style={styles.modal}
                      textStyle={styles.pickerButton}
                      dropdownStyle={[styles.dropdown, styles.locationDropdown]}
                      dropdownTextStyle={styles.dropdownText}
                      adjustFrame={(style) => {
                        style.height = 198;
                        style.top = 299;
                        return style;
                      }}
                      onSelect={(index, value) => { handleLocationDropDown(value) }}
                    />
                    <View style={styles.hr}></View>
                  </View>
                </View>
              );
            }}
          </Query>
          <Mutation mutation={UPDATE_RATE_BOUNDARIES} onError={showError} onCompleted={clearForm}>
            {(changeDelay, { data, loading, error }) => {
              return (
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <TouchableHighlight
                    underlayColor="#19B01D"
                    style={styles.buttonBody}
                    onPress={handleSubmit((values) => {
                      const { buyRateLowerLimit, buyRateUpperLimit, sellRateLowerLimit, sellRateUpperLimit} = values;
                      const shouldSubmit = onSubmit();
                      if(shouldSubmit) {
                        return changeDelay({
                          variables: {
                            boundarySettings:
                            {
                              rateBoundaries: {
                                buyRateLowerLimit,
                                buyRateUpperLimit,
                                sellRateLowerLimit,
                                sellRateUpperLimit,
                                currency: currency,
                                locationId: LOCATION_ID
                              }
                            }
                          },
                        })
                      }
                    }
                    )}
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
                </View>
              );
            }}
          </Mutation>
        </ScrollView>
      </View>
        );
      }
    };

const withReduxForm = reduxForm({
          form: 'rate-boundaries'
      })

      export default withReduxForm(RateBoundariesForm);
