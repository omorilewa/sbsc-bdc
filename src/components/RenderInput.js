import React from "react";
import PropTypes from "prop-types";
import { Input, Item, Icon } from "native-base";
import { Image } from "react-native";
import { HomeScreenStyles as styles } from "../styles";

const RenderInput = ({
  placeholder,
  username,
  meta: { touched, error },
  secureTextEntry,
  input: { onChange, ...restInput }
}) => (
  <Item
    rounded
    style={
      touched && error
        ? [styles.inputView, styles.errorStyle]
        : styles.inputView
    }
  >
    {touched && error && <Icon style={styles.searchIcon} name="alert" />}
    {username ? (
      <Image
        style={styles.icon}
        source={require(`../assets/images/icon_username.png`)}
      />
    ) : (
      <Image
        style={styles.icon2}
        source={require(`../assets/images/icon_password.png`)}
      />
    )}
    <Input
      style={styles.input}
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      {...restInput}
      placeholder={placeholder}
      placeholderTextColor="#9c9e9f"
    />
  </Item>
);

RenderInput.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool
};

export default RenderInput;
