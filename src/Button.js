/* @flow */
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  label: string,
  color?: string,
  bold?: boolean,
  disabled?: boolean,
  onPress: () => mixed,
  style?: any,
};

const COLOR = Platform.OS === 'ios' ? '#007ff9' : '#169689';

export default class DialogButton extends React.PureComponent<Props> {
  static defaultProps = {
    color: COLOR,
    disabled: false,
  };

  render() {
    const { label, color, disabled, bold, onPress, style, ...otherProps } = this.props;
    const fontWeight = bold ? 'normal' : '500';
    return (
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
        <Text
          style={[styles.text, { color: color, fontWeight: fontWeight }, style]}
          {...otherProps}
        >
          {Platform.OS === 'ios' ? label : label.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    android: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  text: Platform.select({
    ios: {
      textAlign: 'center',
      fontSize: 20,
      backgroundColor: 'transparent',
    },
    android: {
      textAlign: 'center',
      backgroundColor: 'transparent',
      padding: 8,
      fontSize: 14,
    },
  }),
});
