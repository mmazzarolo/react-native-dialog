import * as React from "react";
import { LegacyRef, ReactNode } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  PlatformColor,
  TextInputProps,
  ViewStyle,
  ViewPropTypes,
  StyleProp,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";
import PropTypes from "prop-types";

export interface DialogInputProps extends TextInputProps {
  label?: ReactNode;
  labelStyle?: StyleProp;
  wrapperStyle?: StyleProp<ViewStyle>;
  textInputRef?: LegacyRef<TextInput>;
}

const DialogInput: React.FC<DialogInputProps> = (props) => {
  const {
    label,
    style,
    wrapperStyle,
    textInputRef,
    multiline,
    numberOfLines,
    ...nodeProps
  } = props;
  const lines = (multiline && numberOfLines) || 1;
  const height =
    18 + Platform.select({ ios: 14, android: 22, default: 0 }) * lines;
  const { styles, isDark } = useTheme(buildStyles);
  return (
    <View style={[styles.textInputWrapper, wrapperStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        ref={textInputRef}
        placeholderTextColor={
          Platform.OS === "ios"
            ? PlatformColor("placeholderText")
            : PlatformColor(
                `@android:color/${
                  isDark ? "hint_foreground_dark" : "hint_foreground_light"
                }`
              )
        }
        underlineColorAndroid={PlatformColor(
          `@android:color/${
            isDark ? "hint_foreground_dark" : "hint_foreground_light"
          }`
        )}
        style={[styles.textInput, style, { height }]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...nodeProps}
      />
    </View>
  );
};

DialogInput.propTypes = {
  ...ViewPropTypes,
  label: PropTypes.string,
  textInputRef: PropTypes.any,
  wrapperStyle: ViewPropTypes.style,
  numberOfLines: PropTypes.number,
  multiline: PropTypes.bool,
  style: (Text as any).propTypes.style,
};

DialogInput.displayName = "DialogInput";

const buildStyles: StyleBuilder = (isDark) =>
  StyleSheet.create({
    textInputWrapper: Platform.select({
      ios: {
        backgroundColor: PlatformColor("systemGray5"),
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        borderColor: PlatformColor("separator"),
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 8,
      },
      android: {
        marginHorizontal: 10,
        marginBottom: 20,
      },
      default: {},
    }),
    label: Platform.select({
      ios: {
        color: PlatformColor("label"),
      },
      android: {
        color: PlatformColor(
          `@android:color/${
            isDark ? "primary_text_dark" : "primary_text_light"
          }`
        ),
        fontSize: 14,
      },
      default: {},
    }),
    textInput: Platform.select({
      ios: {
        color: PlatformColor("label"),
      },
      android: {
        color: PlatformColor(
          `@android:color/${
            isDark ? "primary_text_dark" : "primary_text_light"
          }`
        ),
        marginLeft: -4,
        paddingLeft: 4,
      },
      default: {},
    }),
  });

export default DialogInput;
