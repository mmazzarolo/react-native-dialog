/* @flow */
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

type Props = {
  style: ?any,
  children: string,
};

export default class DialogDescription extends React.PureComponent<Props> {
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
      textAlign: 'center',
      color: 'black',
      fontSize: 16,
      marginTop: 10,
    },
    android: {
      color: '#33383D',
      fontSize: 16,
      marginTop: 10,
    },
  }),
});
