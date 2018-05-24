import React from "react";
import { string, bool, node, oneOfType, number } from "prop-types";
import { StyleSheet } from 'react-native';
import { Button } from "native-base";

export const StyledButton = props => {
  const styles = StyleSheet.flatten(props.style);
  const buttonStyle = styles || {};

  const { height, width, color } = props;

  if (props.color) {
    buttonStyle.backgroundColor = color;
  }

  if (props.height) {
    buttonStyle.height = height;
  }

  if (props.width) {
    buttonStyle.width = width;
  }

  if (props.default) {
    buttonStyle.marginTop = "4%";
    buttonStyle.height = 50;
  }

  return (
    <Button
      {...props}
      style={[buttonStyle]}
    >
      {props.children}
    </Button>
  );
};

StyledButton.propTypes = {
  height: oneOfType([string, number]),
  width: string,
  default: bool,
  color: string,
  children: node.isRequired,
};

StyledButton.defaultProps = {
  color: "#19B01D",
};
