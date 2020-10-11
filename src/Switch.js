import PropTypes from "prop-types";
import React from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";

const DialogSwitch = (props) => {
  const { label, ...nodeProps } = props;
  return (
    <View style={styles.switchWrapper}>
      <Text style={styles.label}>{label}</Text>
      <Switch {...nodeProps} />
    </View>
  );
};

DialogSwitch.propTypes = {
  ...Switch.propTypes,
  label: PropTypes.string,
};

DialogSwitch.displayName = "DialogSwitch";

const styles = StyleSheet.create({
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
  }),
  label: Platform.select({
    ios: {
      flex: 1,
      paddingRight: 8,
      fontSize: 13,
      color: "black",
    },
    android: {
      flex: 1,
      paddingRight: 8,
      fontSize: 16,
      color: "#33383D",
    },
  }),
});

export default DialogSwitch;
