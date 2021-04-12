import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Text, PlatformColor } from "react-native";
import { useTheme } from "./components/hooks";

const DialogDescription = (props) => {
  const { style, children, ...nodeProps } = props;
  const { styles } = useTheme(buildStyles);

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

const buildStyles = (isDark) =>
  StyleSheet.create({
    text: Platform.select({
      ios: {
        textAlign: "center",
        color: PlatformColor("secondaryLabel"),
        fontSize: 13,
        marginTop: 4,
      },
      android: {
        color: PlatformColor(
          `@android:color/${
            isDark ? "secondary_text_dark" : "secondary_text_light"
          }`
        ),
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
