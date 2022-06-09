import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  PlatformColor,
  TextProps,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";

export type DialogTitleProps = TextProps;

const DialogTitle: React.FC<DialogTitleProps> = (props) => {
  const { style, children, ...nodeProps } = props;
  const { styles } = useTheme(buildStyles);

  return (
    <Text style={[styles.text, style]} {...nodeProps}>
      {children}
    </Text>
  );
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
      default: {},
    }),
  });

export default DialogTitle;
