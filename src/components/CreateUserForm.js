import React, { Component } from "react";
import {
  View,
  TouchableHighlight,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Label, Item } from "native-base";
import _ from 'lodash';
import ModalDropdown from 'react-native-modal-dropdown';
import { Mutation } from 'react-apollo';
import { Field, reduxForm } from "redux-form";
import { showMessage } from "react-native-flash-message";
import { LineInput, StyledText as Text } from ".";
import { UserStyles as styles } from '../styles';
import Loader from "./Loader";
import {
  CREATE_BDC_OPERATOR,
  CREATE_BDC_ADMIN,
  emailValidate,
  FETCH_USERS,
  locationId,
  required,
  number,
  passwordValidate,
} from '../util';
import Modal from 'react-native-modal';

const window = Dimensions.get('window');

class CreateUserForm extends Component {
  state = {
    disabled: false,
    email: '',
    errorText: '',
    errored: '',
    firstName: '',
    isAdmin: false,
    isVisible: false,
    lastName: '',
    location: this.props.location,
    locationName: '',
    locationId: '',
    locationSelectError: false,
    password: '',
    passwordMatchError: false,
    phoneNumber: '',
    roleSelectError: false,
    scrollify: false,
    selectedLocation: "",
    selectedRole: '',
    showLocation: false,
    username: '',
    visibleHeight: window.height,
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.dropDown.hide()
  }

  keyboardDidShow = (e) => {
    const newSize = window.height - (e.endCoordinates.height * 1.6);
    this.setState((state) => ({
      visibleHeight: newSize,
      scrollify: true,
      passwordMatchError: false
    }));
  }

  showError = (error) => {
    const stringError = JSON.stringify(error);
    if (stringError.includes('User with username') || stringError.includes('User with email')) {
      this.setState(() => ({
        errored: true,
        errorText: error.graphQLErrors[0].message
      }));
    } else if(stringError.includes('phone')) {
      this.setState(() => ({
        errored: true,
        errorText: "A user with this phone number already exists"
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

  keyboardDidHide = () => {
    this.setState((state) => ({
      visibleHeight: window.height,
      scrollify: false,
    }));
  }

  onClickDropDown = (value) => {
    const extraStateEntries = {
      selectedRole: value,
      showLocation: true,
      roleSelectError: false
    }

    if (value === "Operator") {
      this.setState(() => ({
        isAdmin: false,
        ...extraStateEntries
      }))
    }
    if (value === "Admin") {
      this.setState(() => ({
        isAdmin: true,
        ...extraStateEntries
      }))
    }
  }

  onSubmit = (value) => {
    const {
      firstName,
      lastName,
      email,
      username,
      phoneNumber,
      password
    } = value;

    const { selectedRole, selectedLocation } = this.state;
    if (selectedRole === '') {
      this.setState(() => ({
        roleSelectError: true,
      }));
      return;
    }
    if (selectedLocation === '') {
      this.setState(() => ({
        locationSelectError: true,
      }));
      return;
    }
    if ((value['confirm-password']).trim() !== password.trim()) {
      this.setState(() => ({
        passwordMatchError: true,
      }));
      return;
    }
    if ((value['confirm-password']).trim() === password.trim()) {
      this.setState(() => ({
        passwordMatchError: false,
      }));
    }
    this.setState((state) => ({
      isVisible: true,
      firstName,
      lastName,
      username,
      phoneNumber,
      email,
      password
    }))
  }

  onClickLocationDropDown = (value) => {
    const ID = locationId(this.props.data, value)
    this.setState(() => ({
      selectedLocation: value,
      locationId: ID,
      locationSelectError: false
    }))
  }

  handlePickerChange = (value) => {
    this.setState((state) => {
      return {
        selectedRole: value
      }
    })
  }

  render() {
    const {
      props: { disabled, handleSubmit },
      state: {
        errorText,
        errored,
        isAdmin,
        isVisible,
        location,
        locationSelectError,
        passwordMatchError,
        roleSelectError,
        selectedLocation,
        selectedRole,
        scrollify,
        showLocation,
        visibleHeight,
        locationId,
      },
      onClickDropDown,
      onClickLocationDropDown
    } = this;

    const firstName = _.startCase(_.toLower(this.state.firstName)).trim();
    const lastName = _.startCase(_.toLower(this.state.lastName)).trim();
    const username = _.toLower(this.state.username).trim();
    const email = _.toLower(this.state.email).trim();
    const password = this.state.password.trim();
    const phoneNumber = this.state.phoneNumber.trim();

    return (
      <View style={{ height: visibleHeight }}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={scrollify ? styles.mainWKeyboard : styles.userForm}>
            <View style={styles.passwordSection}>
              <View style={styles.passwordField}>
                <Label style={styles.formLabel}>First Name: </Label>
                <Field
                  name="firstName"
                  style={styles.inputField}
                  component={LineInput}
                  validate={[required]}
                />
              </View>
              <View style={styles.passwordField}>
                <Label style={styles.formLabel}>Last Name: </Label>
                <Field
                  name="lastName"
                  style={styles.inputField}
                  component={LineInput}
                  validate={[required]}
                />
              </View>
            </View>
            <View style={styles.fieldView}>
              <Label style={styles.formLabel}>Username: </Label>
              <Field
                name="username"
                style={styles.inputField}
                component={LineInput}
                validate={[required]}
              />
            </View>
            <View style={styles.fieldView}>
              <Label style={styles.formLabel}>Phone No: </Label>
              <Field
                name="phoneNumber"
                style={styles.inputField}
                component={LineInput}
                keyboardType="numeric"
                validate={[required, number]}
              />
            </View>
            <View style={styles.fieldView}>
              <Label style={styles.formLabel}>Email: </Label>
              <Field
                name="email"
                style={styles.inputField}
                component={LineInput}
                validate={[required, emailValidate]}
              />
            </View>

            <View style={styles.passwordSection}>
              <View style={styles.passwordField}>
                <Label style={styles.formLabel}>Password: </Label>
                <Field
                  name="password"
                  style={styles.inputField}
                  component={LineInput}
                  validate={[required, passwordValidate]}
                  secureTextEntry
                />
              </View>
              <View style={styles.passwordField}>
                <Label style={styles.formLabel}>Confirm Password: </Label>
                <Field
                  name="confirm-password"
                  style={styles.inputField}
                  component={LineInput}
                  validate={[required, passwordValidate]}
                  secureTextEntry
                />
              </View>
            </View>
            <View style={styles.passwordSection}>
              <View style={styles.passwordField}>
                <Label style={styles.formLabel}>Select role: </Label>
                <Item style={styles.pickerItem}>
                  <TouchableOpacity
                    style={styles.picker}
                    onPress={() => {
                      this.dropDown && this.dropDown.show();
                    }}>
                    <View style={styles.modalView}>
                      <ModalDropdown ref={(el) => { this.dropDown = el }}
                        options={["Operator", "Admin"]}
                        defaultValue={""}
                        style={styles.modal}
                        textStyle={styles.pickerText}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdowntext}
                        adjustFrame={(style) => {
                          style.height = 68;
                          style.top = 468;
                          return style;
                        }}
                        onSelect={(index, value) => { onClickDropDown(value) }}
                      />
                      <Text style={styles.arrow}>▼</Text>
                    </View>
                  </TouchableOpacity>
                </Item>
                {roleSelectError && <Text style={styles.errorMsg}>Please select a role</Text>}
              </View>
            </View>
            {showLocation && <View style={styles.passwordSection}>
              <View style={styles.passwordField}>
                <Label style={styles.formLabel}>Select Location: </Label>
                <Item style={{ width: '100%' }}>
                  <TouchableOpacity
                    style={{ width: '100%', marginTop: 5 }}
                    onPress={() => {
                      this.dropDowns && this.dropDowns.show();
                    }}>
                    <View style={styles.modalView}>
                      <ModalDropdown ref={(el) => { this.dropDowns = el }}
                        options={location}
                        defaultValue={""}
                        style={styles.modal}
                        textStyle={styles.pickerText}
                        dropdownStyle={styles.dropdown}
                        dropdownTextStyle={styles.dropdowntext}
                        adjustFrame={(style) => {
                          style.height = 98;
                          style.top = 525;
                          return style;
                        }}
                        onSelect={(index, value) => { onClickLocationDropDown(value) }}
                      />
                      <Text style={styles.arrow}>▼</Text>
                    </View>
                  </TouchableOpacity>
                </Item>
                {locationSelectError && <Text style={styles.errorMsg}>Please select a location</Text>}
              </View>
            </View>}
            {passwordMatchError && <Text style={styles.errorMsg}>Passwords do not match</Text>}
            <TouchableHighlight
              underlayColor="#19B01D"
              style={styles.buttonBody}
              disabled={disabled}
              onPress={handleSubmit(values => {
                if(!!values && typeof values === 'object' && Object.keys(values).every(item => !!item)) {
                  this.onSubmit(values)
                } else {
                  return;
                }
              })}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableHighlight>
            <Modal
              isVisible={isVisible}
              onSwipe={() => this.setState({ isVisible: false })}
              onBackdropPress={() => this.setState({ isVisible: false })}
              onBackButtonPress={() => this.setState({ isVisible: false })}
            >
              <View style={styles.container}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalheader}>CONFIRM YOUR ENTRIES</Text>
                  <View style={styles.modalhr}></View>
                  <View style={styles.contentWidth}>
                    <View style={styles.content}>
                      <Text style={styles.body}>First Name: </Text>
                      <Text style={styles.currency}>{firstName}</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.body}>Last Name: </Text>
                      <Text style={styles.currency}>{lastName}</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.body}>Username: </Text>
                      <Text style={styles.currency}>{username}</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.body}>Email: </Text>
                      <Text style={styles.currency}>{email}</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.body}>Phone No: </Text>
                      <Text style={styles.currency}>{phoneNumber}</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.body}>Role: </Text>
                      <Text style={styles.currency}>{selectedRole}</Text>
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.body}>Location: </Text>
                      <Text style={styles.currency}>{selectedLocation}</Text>
                    </View>
                  </View>
                  <View>
                    {!!errored && <Text style={styles.errorMsg}>{errorText}</Text>}
                  </View>
                  <View style={styles.close}>
                    <TouchableHighlight
                      onPress={() => {
                        this.setState({ isVisible: false, errored: false })
                      }}
                      underlayColor="white">
                      <Text style={styles.button2}>CANCEL</Text>
                    </TouchableHighlight>
                    <Mutation mutation={isAdmin ? CREATE_BDC_ADMIN : CREATE_BDC_OPERATOR} onError={this.showError} onCompleted={this.clearForm}>
                      {(newBDCUser, { data, loading, error }) => (
                        <View>
                          <TouchableHighlight disabled={disabled} underlayColor="white"
                            onPress={async () => {
                              await newBDCUser({
                                variables: { firstName, username, lastName, email, password, phoneNumber, locationId },
                                refetchQueries: [{ query: FETCH_USERS }]
                              });
                              showMessage({
                                message: "User created successfully",
                                type: "success",
                                backgroundColor: "#19B01D"
                              });
                            }}
                          >
                            <Text style={styles.button1}>CONTINUE</Text>
                          </TouchableHighlight>
                          {loading && <Loader loading={loading} />}
                          {
                            error &&
                            showMessage({
                              message: "User creation failed",
                              type: "danger",
                            })
                          }
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

const CreateUser = reduxForm({
  form: 'create-user'
})(CreateUserForm)

export default CreateUser;
