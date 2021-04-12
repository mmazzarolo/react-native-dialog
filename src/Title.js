import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Text, PlatformColor } from "react-native";
import useTheme from "./useTheme";

const DialogTitle = (props) => {
  const { style, children, ...nodeProps } = props;
  const { styles } = useTheme(buildStyles);

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

const buildStyles = (isDark) =>
  StyleSheet.create({
    text: Platform.select({
      ios: {
        color: PlatformColor("label"),
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
      },
      android: {
        color: PlatformColor(
          `@android:color/${
            isDark ? "primary_text_dark" : "primary_text_light"
          }`
        ),
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
