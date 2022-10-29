import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  PlatformColor,
  TextProps,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";

export type DialogDescriptionProps = TextProps;

const DialogDescription: React.FC<DialogDescriptionProps> = (props) => {
  const { style, children, ...nodeProps } = props;
  const { styles } = useTheme(buildStyles);

  return (
    <Text style={[styles.text, style]} {...nodeProps}>
      {children}
    </Text>
  );
};

DialogDescription.displayName = "DialogDescription";

const buildStyles: StyleBuilder = (isDark) =>
  StyleSheet.create({
    text: Platform.select({
      ios: {
        textAlign: "center",
        color: PlatformColor("label"),
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
      default: {},
    }),
  });

export default DialogDescription;
