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

export interface DialogDescriptionProps {
  style?: ViewStyle;
  children: ReactNode;
}

const DialogDescription: React.FC<DialogDescriptionProps> = (props) => {
  const { style, children, ...nodeProps } = props;
  const { styles } = useTheme(buildStyles);

  return (
    <Text style={[styles.text, style]} {...nodeProps}>
      {children}
    </Text>
  );
};

DialogDescription.propTypes = {
  ...TextPropTypes,
  style: PropTypes.any,
};

DialogDescription.displayName = "DialogDescription";

const buildStyles: StyleBuilder = (isDark) =>
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
          `@color/${
            isDark
              ? "dialog_secondary_text_dark"
              : "dialog_secondary_text_light"
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
      default: {},
    }),
  });

export default DialogDescription;
