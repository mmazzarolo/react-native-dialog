import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Text } from "react-native";

export default class DialogDescription extends React.PureComponent {
  static propTypes = {
    ...Text.propTypes,
    style: PropTypes.any,
    children: PropTypes.string.isRequired
  };

  static displayName = "DialogDescription";

  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <Text style={[styles.text, style]} {...otherProps}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: Platform.select({
    ios: {
      textAlign: "center",
      color: "black",
      fontSize: 13,
      marginTop: 4
    },
    android: {
      color: "#33383D",
      fontSize: 16,
      marginTop: 10
    },
    web: {
      color: "#33383D",
      fontSize: 16,
      marginTop: 10
    }
  })
});
