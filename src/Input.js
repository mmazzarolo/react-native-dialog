import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

export default class DialogInput extends React.PureComponent {
  static propTypes = {
    ...TextInput.propTypes,
    label: PropTypes.string,
    style: PropTypes.any,
    textInputRef: PropTypes.any,
    wrapperStyle: PropTypes.any
  };

  static displayName = "DialogInput";

  render() {
    const {
      label,
      style,
      wrapperStyle,
      textInputRef,
      ...otherProps
    } = this.props;
    return (
      <View style={[styles.textInputWrapper, wrapperStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={textInputRef}
          style={[styles.textInput, style]}
          {...otherProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputWrapper: Platform.select({
    ios: {
      backgroundColor: "white",
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 6,
      borderColor: "#A9ADAE",
      marginHorizontal: 20,
      marginBottom: 20,
      paddingHorizontal: 8
    },
    android: {
      marginHorizontal: 10,
      marginBottom: 20
    }
  }),
  label: Platform.select({
    ios: {},
    android: {
      color: "rgba(0, 0, 0, 0.5)",
      fontSize: 14
    }
  }),
  textInput: Platform.select({
    ios: {
      height: 32
    },
    android: {
      marginLeft: -4,
      paddingLeft: 4,
      height: 40
    }
  })
});
