/* @flow */
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

type Props = {
  style: ?any,
  children: string,
};

export default class DialogTitle extends React.PureComponent<Props> {
  render() {
    const { style, children, ...otherProps } = this.props;
    return (
      <Text style={[styles.text, style]} {...otherProps}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: Platform.select({
    ios: {
      color: 'black',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
    },
    android: {
      color: '#33383D',
      fontWeight: '500',
      fontSize: 18,
    },
  }),
});
