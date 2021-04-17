import React from "react";
import {
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
  PlatformColor,
  SwitchProps,
  ViewPropTypes,
} from "react-native";
import useTheme, { StyleBuilder } from "./useTheme";
import PropTypes from "prop-types";

interface DialogSwitchProps extends SwitchProps {
  label?: string;
}

const DialogSwitch: React.FC<DialogSwitchProps> = (props) => {
  const { label, ...nodeProps } = props;
  const { styles } = useTheme(buildStyles);
  return (
    <View style={styles.switchWrapper}>
      <Text style={styles.label}>{label}</Text>
      <Switch {...nodeProps} />
    </View>
  );
};

DialogSwitch.propTypes = {
  ...ViewPropTypes,
  label: PropTypes.string,
};

DialogSwitch.displayName = "DialogSwitch";

const buildStyles: StyleBuilder = (isDark) =>
  StyleSheet.create({
    switchWrapper: Platform.select({
      ios: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 14,
        paddingHorizontal: 8,
      },
      android: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 20,
      },
      default: {},
    }),
    label: Platform.select({
      ios: {
        flex: 1,
        paddingRight: 8,
        fontSize: 13,
        color: PlatformColor("label"),
      },
      android: {
        flex: 1,
        paddingRight: 8,
        fontSize: 16,
        color: PlatformColor(
          `@android:color/${
            isDark ? "primary_text_dark" : "primary_text_light"
          }`
        ),
      },
      default: {},
    }),
  });

export default DialogSwitch;
