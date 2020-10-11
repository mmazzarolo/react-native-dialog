import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

const COLOR = Platform.OS === "ios" ? "#007ff9" : "#169689";

const DialogButton = (props) => {
  const { label, color, disabled, bold, onPress, style, ...nodeProps } = props;
  const fontWeight = bold ? "600" : "normal";
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[styles.text, { color: color, fontWeight: fontWeight }, style]}
        {...nodeProps}
      >
        {Platform.OS === "ios" ? label : label.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

DialogButton.propTypes = {
  ...Text.propTypes,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  bold: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

DialogButton.defaultProps = {
  color: COLOR,
  disabled: false,
};

DialogButton.displayName = "DialogButton";

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    android: {
      justifyContent: "center",
      alignItems: "center",
    },
    web: {
      justifyContent: "center",
      alignItems: "center",
    },
  }),
  text: Platform.select({
    ios: {
      textAlign: "center",
      fontSize: 17,
      backgroundColor: "transparent",
    },
    android: {
      textAlign: "center",
      backgroundColor: "transparent",
      padding: 8,
      fontSize: 14,
    },
    web: {
      textAlign: "center",
      backgroundColor: "transparent",
      padding: 8,
      fontSize: 14,
    },
  }),
});

export default DialogButton;
