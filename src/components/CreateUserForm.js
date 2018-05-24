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
import ModalDropdown from 'react-native-modal-dropdown';
import { Field, reduxForm } from "redux-form";
import { LineInput, StyledText as Text } from ".";
import { UserStyles as styles } from '../styles';
import { required, email } from '../util';

const window = Dimensions.get('window');

class CreateUserForm extends Component {
  state = {
    disabled: false,
    visibleHeight: window.height,
    scrollify: false,
    showLocation: false,
    selectedRole: "",
    selectedLocation: "",
    location: this.props.location,
    roleSelectError: false,
    locationSelectError: false
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
      scrollify: true
    }));
  }

  keyboardDidHide = () => {
    this.setState((state) => ({
      visibleHeight: window.height,
      scrollify: false,
    }));
  }

  onClickDropDown = (value) => {
    if (value === "Operator") {
      this.setState(() => ({
        selectedRole: value,
        showLocation: true,
        roleSelectError: false
      }))
    }
    if (value === "Admin") {
      this.setState(() => ({
        selectedRole: value,
        showLocation: false,
        roleSelectError: false
      }))
    }
  }

  onSubmit = (value) => {
    const { selectedRole, selectedLocation } = this.state;
    if (selectedRole === '') {
      this.setState(() => ({
        roleSelectError: true,
      }))
      return;
    }
    if (selectedLocation === '') {
      this.setState(() => ({
        locationSelectError: true,
      }))
      return;
    }
  }

  onClickLocationDropDown = (value) => {
    this.setState(() => ({
      selectedLocation: value,
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
        visibleHeight,
        scrollify,
        showLocation,
        location,
        roleSelectError,
        locationSelectError
      },
    } = this;
    return (
      <View style={{ height: visibleHeight }}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={scrollify ? styles.mainWKeyboard : styles.userForm}>
            <View style={styles.fieldView}>
              <Label style={styles.formLabel}>First Name: </Label>
              <Field
                name="First Name"
                style={styles.inputField}
                component={LineInput}
                validate={[required]}
              />
            </View>
            <View style={styles.fieldView}>
              <Label style={styles.formLabel}>Last Name: </Label>
              <Field
                name="Last Name"
                style={styles.inputField}
                component={LineInput}
                validate={[required]}
              />
            </View>
            <View style={styles.fieldView}>
              <Label style={styles.formLabel}>username: </Label>
              <Field
                name="username"
                style={styles.inputField}
                component={LineInput}
                validate={[required]}
              />
            </View>
            <View style={styles.fieldView}>
              <Label style={styles.formLabel}>Email: </Label>
              <Field
                name="email"
                style={styles.inputField}
                component={LineInput}
                validate={[required, email]}
              />
            </View>
            <View style={styles.passwordSection}>
              <View style={styles.passwordField}>
                <Label style={styles.formLabel}>Password: </Label>
                <Field
                  name="password"
                  style={styles.inputField}
                  component={LineInput}
                  validate={[required]}
                />
              </View>
              <View style={styles.passwordField}>
                <Label style={styles.formLabel}>Confirm Password: </Label>
                <Field
                  name="confirm-password"
                  style={styles.inputField}
                  component={LineInput}
                  validate={[required]}
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
                          style.top = 438;
                          return style;
                        }}
                        onSelect={(index, value) => { this.onClickDropDown(value) }}
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
                          style.top = 495;
                          return style;
                        }}
                        onSelect={(index, value) => { this.onClickLocationDropDown(value) }}
                      />
                      <Text style={styles.arrow}>▼</Text>
                    </View>
                  </TouchableOpacity>
                </Item>
                {locationSelectError && <Text style={styles.errorMsg}>Please select a location</Text>}
              </View>
            </View>}
            <TouchableHighlight
              underlayColor="#19B01D"
              style={styles.buttonBody}
              disabled={disabled}
              onPress={handleSubmit((values) => this.onSubmit(values))}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableHighlight>
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
