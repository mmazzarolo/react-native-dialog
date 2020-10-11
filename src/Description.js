import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Text } from "react-native";

const DialogDescription = (props) => {
  const { style, children, ...nodeProps } = props;
  return (
    <Text style={[styles.text, style]} {...nodeProps}>
      {children}
    </Text>
  );
};

DialogDescription.propTypes = {
  ...Text.propTypes,
  style: PropTypes.any,
  children: PropTypes.string.isRequired,
};

DialogDescription.displayName = "DialogDescription";

const styles = StyleSheet.create({
  text: Platform.select({
    ios: {
      textAlign: "center",
      color: "black",
      fontSize: 13,
      marginTop: 4,
    },
    android: {
      color: "#33383D",
      fontSize: 16,
      marginTop: 10,
    },
    web: {
      color: "#33383D",
      fontSize: 16,
      marginTop: 10,
    },
  }),
});

export default DialogDescription;
