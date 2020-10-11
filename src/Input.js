import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

const DialogInput = (props) => {
  const {
    label,
    style,
    wrapperStyle,
    textInputRef,
    multiline,
    numberOfLines,
    ...nodeProps
  } = props;
  const lines = (multiline && numberOfLines) || 1;
  const height = 18 + Platform.select({ ios: 14, android: 22 }) * lines;
  return (
    <View style={[styles.textInputWrapper, wrapperStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={textInputRef}
        style={[styles.textInput, style, { height }]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...nodeProps}
      />
    </View>
  );
};

DialogInput.propTypes = {
  ...TextInput.propTypes,
  label: PropTypes.string,
  style: PropTypes.any,
  textInputRef: PropTypes.any,
  wrapperStyle: PropTypes.any,
  numberOfLines: PropTypes.number,
  multiline: PropTypes.bool,
};

DialogInput.displayName = "DialogInput";

const styles = StyleSheet.create({
  textInputWrapper: Platform.select({
    ios: {
      backgroundColor: "white",
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 6,
      borderColor: "#A9ADAE",
      marginHorizontal: 20,
      marginBottom: 20,
      paddingHorizontal: 8,
    },
    android: {
      marginHorizontal: 10,
      marginBottom: 20,
    },
  }),
  label: Platform.select({
    ios: {},
    android: {
      color: "rgba(0, 0, 0, 0.5)",
      fontSize: 14,
    },
  }),
  textInput: Platform.select({
    ios: {},
    android: {
      marginLeft: -4,
      paddingLeft: 4,
    },
  }),
});

export default DialogInput;
