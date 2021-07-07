import * as React from "react";
import { useMemo } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  PlatformColor,
  TextProps,
  TextPropTypes,
  ViewStyle,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";
import PropTypes from "prop-types";

const COLOR = Platform.OS === "ios" ? "#007ff9" : "#169689";

export interface DialogButtonProps extends TextProps {
  label: string;
  color?: string;
  bold?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export interface DialogButtonHiddenProps {
  vertical?: boolean;
  buttonStyle?: ViewStyle;
}

const DialogButton: React.FC<DialogButtonProps & DialogButtonHiddenProps> = (
  props
) => {
  const {
    label,
    color = COLOR,
    disabled = false,
    bold,
    onPress,
    style,
    buttonStyle = {},
    vertical = false,
    ...nodeProps
  } = props;
  const fontWeight = bold ? "600" : "normal";
  const buildStylesMemo = useMemo(
    () => (isDark: boolean) => buildStyles(isDark, vertical),
    [vertical]
  );
  const { styles } = useTheme(buildStylesMemo);

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
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

const buildStyles: StyleBuilder = (
  isDark: boolean,
  isVerticalButtons?: boolean
) =>
  StyleSheet.create({
    button: Platform.select({
      ios: {
        flex: isVerticalButtons ? 0 : 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12.5,
        borderTopColor: PlatformColor("separator"), //"#A9ADAE",
        borderTopWidth: StyleSheet.hairlineWidth,
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
