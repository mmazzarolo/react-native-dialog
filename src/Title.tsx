import PropTypes from "prop-types";
import * as React from "react";
import { ReactNode } from "react";
import {
  Platform,
  PlatformColor,
  StyleSheet,
  Text,
  TextPropTypes,
  ViewStyle,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";

export interface DialogTitleProps {
  style?: ViewStyle;
  children: ReactNode;
}

const DialogTitle: React.FC<DialogTitleProps> = (props) => {
  const { style, children, ...nodeProps } = props;
  const { styles } = useTheme(buildStyles);

  return (
    <Text style={[styles.text, style]} {...nodeProps}>
      {children}
    </Text>
  );
};

DialogTitle.propTypes = {
  ...TextPropTypes,
  style: PropTypes.any,
  children: PropTypes.string.isRequired,
};

DialogTitle.displayName = "DialogTitle";

const buildStyles: StyleBuilder = (isDark) =>
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
          `@color/${
            isDark ? "dialog_primary_text_dark" : "dialog_primary_text_light"
          }`
        ),
        fontWeight: "500",
        fontSize: 18,
      },
      web: {
        fontWeight: "500",
        fontSize: 18,
      },
      default: {},
    }),
  });

export default DialogTitle;
