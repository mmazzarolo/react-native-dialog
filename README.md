# react-native-dialog

[![npm version](https://badge.fury.io/js/react-native-modal.svg)](https://badge.fury.io/js/react-native-dialog)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A 100% JavaScript react-native dialog that follows closely the UI of its native counterpart while expanding its features.

## Features

* Support for iOS and Android (100% JavaScript)
* A flexible declarative API
* Follows closely the UI of a native dialog/alert

## Demo

<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-dialog/master/.github/react-native-dialog-android-alert" height="300" />
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-dialog/master/.github/react-native-dialog-ios-alert" height="300" />
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-dialog/master/.github/react-native-dialog-android-input" height="300" />
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-dialog/master/.github/react-native-dialog-ios-input" height="300" />
</p>

## Setup

Install the library using npm or yarn:

```bash
# using npm
$ npm install react-native-dialog --save

# using yarn
$ yarn add react-native-dialog
```

The other dependency you must install is [react-native-blur](react-native-blur), which is used to achieve the "blurred" alert look on iOS.

You can install it using npm or yarn:

```bash
# using npm
$ npm install react-native-blur --save

# using yarn
$ yarn add react-native-blur
```

And last, you should link it using react-native link:

```bash
# link the react-native library
$ react-native link react-native-blur
```

## Usage

WIP

## A complete example

WIP

## Available props

### Dialog.Button props

| Name     | Type   | Default                                | Description                           |
| -------- | ------ | -------------------------------------- | ------------------------------------- |
| label    | string | **REQUIRED**                           | The label text                        |
| color    | string | `#007ff9` on iOS, `#169689` on Android | The label color                       |
| bold     | bool   | false                                  | Show the label with bold font weight? |
| disabled | bool   | false                                  | Disable the button?                   |
| onPress  | func   | **REQUIRED**                           | Called when the button is pressed     |

### Dialog.Description props

| Name     | Type   | Default      | Description          |
| -------- | ------ | ------------ | -------------------- |
| children | string | **REQUIRED** | The description text |

### Dialog.Container props

| Name     | Type | Default      | Description        |
| -------- | ---- | ------------ | ------------------ |
| visible  | bool | **REQUIRED** | Show the dialog?   |
| children | node | **REQUIRED** | The dialog content |

### Dialog.Input props

| Name         | Type | Default   | Description                                 |
| ------------ | ---- | --------- | ------------------------------------------- |
| wrapperStyle | any  | undefined | The style applied to the input wrapper View |

### Dialog.Title props

| Name     | Type   | Default      | Description    |
| -------- | ------ | ------------ | -------------- |
| children | string | **REQUIRED** | The title text |

## Frequently Asked Questions

WIP

## Acknowledgment
