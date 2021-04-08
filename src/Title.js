import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Text, PlatformColor } from "react-native";
import { useTheme } from "./components/hooks";

const DialogTitle = (props) => {
  const { style, children, ...nodeProps } = props;
  const { styles } = useTheme(__styles);

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

const __styles = (isDark) =>
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
