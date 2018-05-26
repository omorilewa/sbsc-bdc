import React from "react";
import {
  string,
  object,
  func,
  number,
  oneOfType,
  oneOf
} from "prop-types";
import { Input, Item, Icon } from "native-base";
import { LineInputStyles as styles } from "../styles";

const LineInput = ({
  placeholder,
  maxLength,
  style,
  keyboardType,
  secureTextEntry,
  meta: { touched, error, active, dirty, submitFailed },
  input: { onChange, onFocus, ...restInput }
}) => {
  const toggleStyle = () => {
    if (dirty && error) {
      return styles.errorInput;
    } else if (active) {
      return styles.validInput
    }
  }

  return (
    <Item style={toggleStyle()}>
      <Input
        style={style}
        onChangeText={onChange}
        onFocus={onFocus}
        {...restInput}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor="#D1D1D1"
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
      {(dirty || submitFailed) && error && <Icon style={styles.errorText} name="close-circle" />}
    </Item>
  )
};

LineInput.propTypes = {
  meta: object,
  input: object,
  style: oneOfType([
    number,
    object
  ]),
  placeholder: string,
  onChangeText: func,
  onFocus: func,
  maxLength: number,
  keyboardType: oneOf([
    "numeric",
    "default"
  ])
};

export default LineInput;
