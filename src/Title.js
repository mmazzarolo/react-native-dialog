import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Text } from "react-native";

const DialogTitle = (props) => {
  const { style, children, ...nodeProps } = props;
  return (
    <Text style={[styles.text, style]} {...nodeProps}>
      {children}
    </Text>
  );
};

DialogTitle.propTypes = {
  ...Text.propTypes,
  style: PropTypes.any,
  children: PropTypes.string.isRequired,
};

DialogTitle.displayName = "DialogTitle";

const styles = StyleSheet.create({
  text: Platform.select({
    ios: {
      color: "black",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "600",
    },
    android: {
      fontWeight: "500",
      fontSize: 18,
    },
    web: {
      fontWeight: "500",
      fontSize: 18,
    },
  }),
});

export default DialogTitle;
