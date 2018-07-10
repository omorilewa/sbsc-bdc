import React, { PureComponent } from "react";
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



class LineInput extends PureComponent {

  toggleStyle = () => {
    const { meta: { error, active, dirty } } = this.props;
    if (dirty && error) {
      return styles.errorInput;
    } else if (active) {
      return styles.validInput
    }
  }

  render() {
    const {
      placeholder,
      maxLength,
      style,
      secureTextEntry,
      keyboardType,
      meta: {  error, dirty, submitFailed },
      input: { onChange, onFocus, ...restInput }
    } = this.props;
    return (
      <Item style={this.toggleStyle()}>
        <Input
          style={style}
          onChangeText={onChange}
          onFocus={onFocus}
          {...restInput}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#D1D1D1"
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
        {(dirty || submitFailed) && error && <Icon style={styles.errorText} name="close-circle" />}
      </Item>
    );
  }
}

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
