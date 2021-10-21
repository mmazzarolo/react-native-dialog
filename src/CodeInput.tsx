import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  PlatformColor,
  TextInputProps,
  ViewStyle,
  ViewPropTypes,
  StyleProp,
  TextStyle,
} from "react-native";
import useTheme from "./useTheme";
import PropTypes from "prop-types";

export interface DialogCodeInputProps extends TextInputProps {
  wrapperStyle?: StyleProp<ViewStyle>;
  digitContainerStyle?: StyleProp<ViewStyle>;
  digitContainerFocusedStyle?: StyleProp<ViewStyle>;
  digitStyle?: StyleProp<TextStyle>;
  codeLength?: number;
  onCodeChange?: (code: string) => void;
}

const DialogCodeInput: React.FC<DialogCodeInputProps> = (props) => {
  const {
    style,
    wrapperStyle,
    digitContainerStyle,
    digitContainerFocusedStyle,
    digitStyle,
    codeLength = 4,
    onCodeChange,
    ...nodeProps
  } = props;
  const { styles } = useTheme(buildStyles);
  const codeRef = React.useRef<TextInput>(null);
  const [containerIsFocused, setContainerIsFocused] = React.useState(
    props.autoFocus || false
  );
  const [code, setCode] = React.useState("");
  const codeDigitsArray = new Array(codeLength).fill(0);
  const emptyInputChar = " ";
  const handleContainerPress = () => {
    setContainerIsFocused(true);
    codeRef?.current?.focus();
  };
  const onCodeChangePress = (t: string) => {
    setCode(t);
    typeof onCodeChange === "function" && onCodeChange(t);
    if (t.length === codeLength) {
      setContainerIsFocused(false);
      codeRef?.current?.blur();
    }
  };
  const handleOnBlur = () => setContainerIsFocused(false);
  const toDigitInput = (_value: number, idx: number) => {
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === codeLength - 1;
    const isCodeFull = code.length === codeLength;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? [
            styles.inputContainer,
            digitContainerStyle,
            styles.inputContainerFocused,
            digitContainerFocusedStyle,
          ]
        : [styles.inputContainer, digitContainerStyle];

    return (
      <View key={idx} style={containerStyle}>
        <Text style={[styles.inputText, digitStyle]}>{digit}</Text>
      </View>
    );
  };
  return (
    <View style={[styles.textInputWrapper, wrapperStyle]}>
      <Pressable
        onPress={handleContainerPress}
        style={[styles.codeContainer, style]}
      >
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={codeRef}
        style={styles.hiddenInput}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        onSubmitEditing={handleOnBlur}
        maxLength={codeLength}
        onChangeText={onCodeChangePress}
        {...nodeProps}
      />
    </View>
  );
};

DialogCodeInput.propTypes = {
  ...ViewPropTypes,
  wrapperStyle: ViewPropTypes.style,
  digitContainerStyle: ViewPropTypes.style,
  digitContainerFocusedStyle: ViewPropTypes.style,
  digitStyle: ViewPropTypes.style,
  codeLength: PropTypes.number,
  onCodeChange: PropTypes.func,
  style: (Text as any).propTypes.style,
};

DialogCodeInput.displayName = "DialogCodeInput";

const buildStyles = (isDark: boolean) =>
  StyleSheet.create({
    codeContainer: {
      width: "90%",
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    inputContainer: {
      flex: 1,
      borderColor: PlatformColor("separator"),
      borderBottomWidth: 3,
      paddingBottom: 5,
      marginHorizontal: 5,
      alignItems: "center",
      ...Platform.select({
        ios: {
          borderColor: PlatformColor("separator"),
        },
        android: {
          //borderColor: PlatformColor(`@android:color/${isDark ? "secondary_text_dark" : "secondary_text_light"}`),
          borderColor: isDark ? "#efefef" : "#8d8d8d",
        },
        default: {},
      }),
    },
    inputContainerFocused: Platform.select({
      ios: {
        borderColor: PlatformColor("label"),
      },
      android: {
        /* borderColor: PlatformColor(
          `@android:color/${
            isDark ? "primary_text_dark" : "primary_text_light"
          }`
        ),*/
        borderColor: isDark ? "#58c7b9" : "#169689",
      },
      default: {},
    }),
    inputText: Platform.select({
      ios: {
        fontSize: 20,
        color: PlatformColor("label"),
      },
      android: {
        color: PlatformColor(
          `@android:color/${
            isDark ? "primary_text_dark" : "primary_text_light"
          }`
        ),
        fontSize: 20,
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
    hiddenInput: {
      position: "absolute",
      height: 0,
      width: 0,
      opacity: 0,
    },
  });

export default DialogCodeInput;
