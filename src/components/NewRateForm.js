import React, { Component } from "react";
import { func } from "prop-types";
import {
  View,
  TouchableHighlight,
  Dimensions,
  Keyboard,
  ScrollView
} from "react-native";
import { Item, Label, Picker } from "native-base";
import { Field } from "redux-form";
import Modal from 'react-native-modal';
import { Mutation } from 'react-apollo';
import { ADD_BDC_RATE, PREVIOUS_RATES } from '../util';
import Loader from "./Loader";
import {
  LineInput,
  StyledButton as Button,
  StyledText as Text
} from ".";
import { NewRateStyles as styles } from "../styles";
import { required, number } from '../util';

const window = Dimensions.get('window');

class NewRateForm extends Component {
  state = {
    selected: "USD",
    isVisible: false,
    buyRate: '',
    sellRate: '',
    errored: '',
    errorText: '',
    disabled: false,
    visibleHeight: window.height,
    scrollify: false,
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardDidShow = (e) => {
    const newSize = window.height - (e.endCoordinates.height * 1.8);
    this.setState((state) => ({
      visibleHeight: newSize,
      scrollify: true
    }));
  }

  keyboardDidHide = () => {
    this.setState((state) => ({
      visibleHeight: window.height,
      scrollify: false,
    }));
  }

  onPickerChange = (value) => {
    this.setState((state) => {
      return {
        selected: value
      }
    })
  }

  showError = (error) => {
    const stringError = JSON.stringify(error);
    if (stringError.includes('previously uploaded a rate')) {
      this.setState(() => ({
        errored: true,
        errorText: error.graphQLErrors[0].message
      }));
    } else {
      this.setState(() => ({
        errored: true,
        errorText: 'Network error, retry'
      }));
    }
  }

  clearForm = () => {
    this.props.reset();
    this.setState((state) => ({
      isVisible: false
    }))
  }

  openModal = (values) => {
    const { buyRate, sellRate } = values

    this.setState((state) => ({
      isVisible: true,
      buyRate,
      sellRate
    }))
  }

  render() {
    const PickerItem = Picker.Item;
    const {
      props: { handleSubmit, reset },
      state: {
        isVisible,
        buyRate,
        sellRate,
        selected,
        errored,
        errorText,
        disabled,
        visibleHeight,
        scrollify
      },
    } = this;

    return (
      <View style={{ height: visibleHeight }}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={scrollify ? styles.mainWKeyboard : styles.main}>
            <Item stackedLabel underline>
              <Label style={styles.formLabel}>Select currency:</Label>
              <Picker
                mode="dropdown"
                style={{ width: '100%' }}
                selectedValue={this.state.selected}
                onValueChange={this.onPickerChange}
              >
                <PickerItem label="USD" value="USD" />
                <PickerItem label="EUR" value="EUR" />
                <PickerItem label="GBP" value="GBP" />
                <PickerItem label="YEN" value="YEN" />
              </Picker>
            </Item>
            <View style={{ marginTop: 35 }}>
              <Label style={styles.formLabel}>Buy rate:</Label>
              <Field
                name="buyRate"
                style={styles.inputField}
                component={LineInput}
                placeholder="Enter rate"
                maxLength={3}
                keyboardType="numeric"
                validate={[required, number]}
              />
            </View>
            <View style={{ marginTop: 35 }}>
              <Label style={styles.formLabel}>Sell rate:</Label>
              <Field
                name="sellRate"
                style={styles.inputField}
                component={LineInput}
                placeholder="Enter rate"
                maxLength={3}
                keyboardType="numeric"
                validate={[required, number]}
              />
            </View>
            <Button
              onPress={handleSubmit((values) => this.openModal(values))}
              block
              rounded
              style={scrollify ? styles.btnWKeyboard : styles.buttonBody}
            >
              <Text style={styles.buttonText}>Submit rate</Text>
            </Button>
            <Modal
              isVisible={isVisible}
              onSwipe={() => this.setState({ isVisible: false })}
              onBackdropPress={() => this.setState({ isVisible: false })}
              onBackButtonPress={() => this.setState({ isVisible: false })}
            >
              <View style={styles.container}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalheader}>CONFIRM YOUR ENTRIES</Text>
                  <View style={styles.hr}></View>
                  <View style={styles.contentWidth}>
                    <View style={styles.content}>
                      <Text style={styles.body}>Currency: </Text>
                      <Text style={styles.currency}>{selected}</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.body}>Buy rate: </Text>
                      <Text style={styles.currency}>{buyRate}</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.body}>Sell rate: </Text>
                      <Text style={styles.currency}>{sellRate}</Text>
                    </View>
                  </View>
                  <View>
                    {!!errored && <Text style={styles.errorText}>{errorText}</Text>}
                  </View>
                  <View style={styles.close}>
                    <TouchableHighlight
                      onPress={() => {
                        reset()
                        this.setState({ isVisible: false, errored: false })
                      }}
                      underlayColor="white">
                      <Text style={styles.button2}>CANCEL</Text>
                    </TouchableHighlight>
                    <Mutation mutation={ADD_BDC_RATE} onError={this.showError} onCompleted={this.clearForm}>
                      {(newBDCRate, { data, loading, error }) => (
                        <View>
                          <TouchableHighlight disabled={disabled} underlayColor="white"
                            onPress={() =>
                              newBDCRate({
                                variables: { buyRate, sellRate, currency: selected },
                                update: (cache, { data: { newBDCRate } }) => {
                                  const { previousRates } = cache.readQuery({query: PREVIOUS_RATES });
                                  cache.writeQuery({
                                    query: PREVIOUS_RATES,
                                    data: { previousRates: previousRates.concat([newBDCRate]) } });
                                }
                              })
                            }>
                            <Text style={styles.button1}>CONTINUE</Text>
                          </TouchableHighlight>
                          {loading && <Loader loading={loading} />}
                        </View>
                      )}
                    </Mutation>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  }
};

NewRateForm.propTypes = {
  handleSubmit: func,
  reset: func,
};

export default NewRateForm;
