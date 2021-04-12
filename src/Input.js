import PropTypes from "prop-types";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  PlatformColor,
} from "react-native";
import { useTheme } from "./components/hooks";

const DialogInput = (props) => {
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
  const height = 18 + Platform.select({ ios: 14, android: 22 }) * lines;
  const { styles, isDark } = useTheme(buildStyles);
  return (
    <View style={[styles.textInputWrapper, wrapperStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={textInputRef}
        placeholderTextColor={
          Platform.OS === "IOS"
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
  ...TextInput.propTypes,
  label: PropTypes.string,
  style: PropTypes.any,
  textInputRef: PropTypes.any,
  wrapperStyle: PropTypes.any,
  numberOfLines: PropTypes.number,
  multiline: PropTypes.bool,
};

DialogInput.displayName = "DialogInput";

const buildStyles = (isDark) =>
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
    }),
  });

export default DialogInput;
