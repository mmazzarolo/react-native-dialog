# react-native-dialog-builder

[![npm version](https://badge.fury.io/js/react-native-modal.svg)](https://badge.fury.io/js/react-native-modal)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A flexible react-native dialog.

## Features

WIP

## Demo

WIP

## Setup

WIP

## Usage

WIP

## A complete example

WIP

## Available props

| Name                        | Type             | Default        | Description                                                                                                                         |
| --------------------------- | ---------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| animationIn                 | string or object | 'slideInUp'    | Modal show animation                                                                                                                |
| animationInTiming           | number           | 300            | Timing for the modal show animation (in ms)                                                                                         |
| animationOut                | string or object | 'slideOutDown' | Modal hide animation                                                                                                                |
| animationOutTiming          | number           | 300            | Timing for the modal hide animation (in ms)                                                                                         |
| avoidKeyboard               | bool             | false          | Move the modal up if the keyboard is open                                                                                           |
| backdropColor               | string           | 'black'        | The backdrop background color                                                                                                       |
| backdropOpacity             | number           | 0.70           | The backdrop opacity when the modal is visible                                                                                      |
| backdropTransitionInTiming  | number           | 300            | The backdrop show timing (in ms)                                                                                                    |
| backdropTransitionOutTiming | number           | 300            | The backdrop hide timing (in ms)                                                                                                    |
| onBackButtonPress           | func             | () => null     | Called when the Android back button is pressed                                                                                      |
| onBackdropPress             | func             | () => null     | Called when the backdrop is pressed                                                                                                 |
| useNativeDriver             | bool             | false          | Define if animations should use [native driver](https://facebook.github.io/react-native/docs/animated.html#using-the-native-driver) |
| isVisible                   | bool             | **REQUIRED**   | Show the modal?                                                                                                                     |
| children                    | node             | **REQUIRED**   | The modal content                                                                                                                   |
| onModalShow                 | func             | () => null     | Called when the modal is completely visible                                                                                         |
| onModalHide                 | func             | () => null     | Called when the modal is completely hidden                                                                                          |
| style                       | any              | null           | Style applied to the modal                                                                                                          |

## Frequently Asked Questions

WIP

## Acknowledgment
