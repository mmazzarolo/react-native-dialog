/* @flow */
import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  style?: any,
  wrapperStyle?: any,
};

export default class DialogInput extends React.PureComponent<Props> {
  render() {
    const { style, wrapperStyle, ...otherProps } = this.props;
    return (
      <View style={[styles.textInputWrapper, wrapperStyle]}>
        <TextInput style={[styles.textInput, style]} autoFocus={true} {...otherProps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputWrapper: Platform.select({
    ios: {
      backgroundColor: 'white',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 8,
      borderColor: '#A9ADAE',
      marginHorizontal: 20,
      marginBottom: 20,
      paddingHorizontal: 8,
    },
    android: {
      marginHorizontal: 10,
      marginBottom: 20,
    },
  }),
  textInput: Platform.select({
    ios: {
      height: 32,
    },
    android: {},
  }),
});
