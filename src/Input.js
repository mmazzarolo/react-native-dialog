import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, TextInput, View } from "react-native";

export default class DialogInput extends React.PureComponent {
  static propTypes = {
    ...TextInput.propTypes,
    style: PropTypes.any,
    wrapperStyle: PropTypes.any
  };

  render() {
    const { style, wrapperStyle, ...otherProps } = this.props;
    return (
      <View style={[styles.textInputWrapper, wrapperStyle]}>
        <TextInput style={[styles.textInput, style]} {...otherProps} />
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
  textInput: Platform.select({
    ios: {
      height: 32
    },
    android: {}
  })
});
