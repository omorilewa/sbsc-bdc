import React from "react";
import { string, bool, node, func } from "prop-types";
import { StyleSheet, TouchableHighlight } from "react-native";

export const THButton = props => {
  const styles = StyleSheet.flatten(props.style);
  const buttonStyle = styles || {};

  const { align, color, height, justify, width } = props;

  if (props.align) {
    buttonStyle.alignItems = align;
  }

  if (props.color) {
    buttonStyle.backgroundColor = color;
  }

  if (props.height) {
    buttonStyle.height = height;
  }

  if (props.justify) {
    buttonStyle.justifyContent = justify;
  }

  if (props.width) {
    buttonStyle.width = width;
  }

  if (props.default) {
    buttonStyle.marginTop = "4%";
    buttonStyle.height = 40;
    buttonStyle.borderRadius = 30;
    buttonStyle.width = "100%";
    buttonStyle.alignItems = "center";
    buttonStyle.justifyContent = "center";
  }

  return (
    <TouchableHighlight {...props} style={[buttonStyle]}>
      {props.children}
    </TouchableHighlight>
  );
};

THButton.propTypes = {
  align: string,
  children: node.isRequired,
  color: string,
  defaultConfig: bool,
  height: string,
  justify: string,
  onPress: func,
  width: string
};

THButton.defaultProps = {
  color: "#19B01D",
};
