import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  PlatformColor,
  TextProps,
  TextPropTypes,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";
import PropTypes from "prop-types";

const COLOR = Platform.OS === "ios" ? "#007ff9" : "#169689";

interface DialogButtonProps extends TextProps {
  label: string;
  color?: string;
  bold?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const DialogButton: React.FC<DialogButtonProps> = (props) => {
  const {
    label,
    color = COLOR,
    disabled = false,
    bold,
    onPress,
    style,
    ...nodeProps
  } = props;
  const fontWeight = bold ? "600" : "normal";
  const { styles } = useTheme(buildStyles);

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
  ...TextPropTypes,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  bold: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};

DialogButton.displayName = "DialogButton";

const buildStyles: StyleBuilder = (isDark) =>
  StyleSheet.create({
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
      default: {},
    }),
    text: Platform.select({
      ios: {
        color: PlatformColor("link"),
        textAlign: "center",
        fontSize: 17,
        backgroundColor: "transparent",
      },
      android: {
        color: PlatformColor(
          `@android:color/${isDark ? "link_text_dark" : "link_text_dark_light"}`
        ),
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
      default: {},
    }),
  });

export default DialogButton;
