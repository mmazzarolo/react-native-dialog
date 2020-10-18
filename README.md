# react-native-dialog

[![npm version](https://badge.fury.io/js/react-native-dialog.svg)](https://badge.fury.io/js/react-native-dialog)

A pure JavaScript React-Native dialog that follows closely the UI of its native counterpart while expanding its features.

## Features

- Support for iOS and Android (JavaScript API)
- A flexible declarative API
- Follows closely the UI of a native dialog/alert
- Can be used both as an alert and as an input prompt
- Can be injected with any component

## Demo

<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-dialog/master/.github/docs-images/react-native-dialog-ios-alert.png" height="500" />
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-dialog/master/.github/docs-images/react-native-dialog-android-alert.png" height="500" />
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-dialog/master/.github/docs-images/react-native-dialog-ios-input.png" height="500" />
<img src="https://raw.githubusercontent.com/mmazzarolo/react-native-dialog/master/.github/docs-images/react-native-dialog-android-input.png" height="500" />
</p>

## Setup

Install the library using npm or yarn:

```bash
# Using npm:
$ npm install react-native-dialog
# Using yarn:
$ yarn add react-native-dialog
```

## Usage

React-native-dialog exposes a set of components that can be used to build the UI of the dialog:

- **Dialog.Container**: This component is the root component of the dialog and all the other components should be nested inside it.
- **Dialog.Title**: A `Text` component styled as a native dialog title.
- **Dialog.Description**: A `Text` component styled as a native dialog description.
- **Dialog.Button**: A component styled as a native dialog button.
- **Dialog.Input**: A `TextInput` component styled as a native dialog input.
- **Dialog.Switch**: A native `Switch` component with an optional label.

1. Import react-native-dialog:

```javascript
import Dialog from "react-native-dialog";
```

2. Create a dialog and nest its content inside of it:

```javascript
return (
  <View>
    <Dialog.Container>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button label="Cancel" />
      <Dialog.Button label="Delete" />
    </Dialog.Container>
  </View>
);
```

3. Then simply show it by setting the `visible` prop to true:

```javascript
return (
  <View>
    <Dialog.Container visible={true}>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button label="Cancel" />
      <Dialog.Button label="Delete" />
    </Dialog.Container>
  </View>
);
```

The `visible` prop is the only prop you'll really need to make the dialog work: you should control this prop value by saving it in your state and setting it to `true` or `false` when needed.

## A complete example

The following example consists in a component (`DialogTester`) with a button and a dialog.
The dialog is controlled by the `dialogVisible` state variable and it is initially hidden since its value is `false`.
Pressing the button sets `dialogVisible` to true, making the dialog visible.
Inside the dialog there are two buttons that, when pressed, set `dialogVisible` to false, hiding the dialog.

```javascript
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

export default function App() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Show dialog" onPress={showDialog} />
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

## Available props

### Dialog.Button props

| Name     | Type   | Default                                | Description                             |
| -------- | ------ | -------------------------------------- | --------------------------------------- |
| label    | string | **REQUIRED**                           | The label text                          |
| color    | string | `#007ff9` on iOS, `#169689` on Android | The label color                         |
| bold     | bool   | false                                  | Show the label with a bold font weight? |
| disabled | bool   | false                                  | Disable the button?                     |
| onPress  | func   | **REQUIRED**                           | Called when the button is pressed       |

### Dialog.Description props

| Name     | Type   | Default      | Description          |
| -------- | ------ | ------------ | -------------------- |
| children | string | **REQUIRED** | The description text |

### Dialog.Container props

| Name                 | Type | Default                | Description                                        |
| -------------------- | ---- | ---------------------- | -------------------------------------------------- |
| blurComponentIOS     | node | A low-opacity <View /> | The blur component used in iOS                     |
| visible              | bool | **REQUIRED**           | Show the dialog?                                   |
| children             | node | **REQUIRED**           | The dialog content                                 |
| contentStyle         | any  | undefined              | Extra style applied to the dialog content          |
| headerStyle          | any  | undefined              | Extra style applied to the dialog header           |
| footerStyle          | any  | undefined              | Extra style applied to the dialog footer           |
| buttonSeparatorStyle | any  | undefined              | Extra style applied to the dialog button separator |
| onBackdropPress      | func | undefined              | Callback invoked when the backdrop is pressed      |

### Dialog.Input props

| Name         | Type   | Default   | Description                                 |
| ------------ | ------ | --------- | ------------------------------------------- |
| label        | string | undefined | The input floating label                    |
| wrapperStyle | any    | undefined | The style applied to the input wrapper View |
| textInputRef | ref    | undefined | Ref to the input                            |

`Dialog.Input` also accepts all the React-Native's `TextInput` component props.

### Dialog.Title props

| Name     | Type   | Default      | Description    |
| -------- | ------ | ------------ | -------------- |
| children | string | **REQUIRED** | The title text |

`Dialog.Title` also accepts all the React-Native's `Text` component props.

### Dialog.Switch props

| Name  | Type   | Default   | Description                 |
| ----- | ------ | --------- | --------------------------- |
| label | string | undefined | The switch description text |

`Dialog.Switch` also accepts all the React-Native's `Switch` component props.

## Frequently Asked Questions

### How can I use a custom blur component as the dialog background on iOS?

To achieve a look even closer to the native iOS dialog you can provide your own component in the `blurComponentIOS` prop of a `Dialog.Container` and it will be injected in the dialog to be used as a background.
The `blurComponentIOS` can be useful for example if you want to apply a native blur effect to the dialog.
Here is an example using `react-native-blur`:

```javascript
const blurComponentIOS = (
  <BlurView style={StyleSheet.absoluteFill} blurType="xlight" blurAmount={50} />
);
return (
  <View style={styles.container}>
    <Dialog.Container visible={visible} blurComponentIOS={blurComponentIOS}>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={handleCancel} />
      <Dialog.Button label="Delete" onPress={handleConfirm} />
    </Dialog.Container>
  </View>
);
```

### How can I add a 'tap outside dialog' callback?

`react-native-dialog` uses [a thin abstraction on top of the React-Native's modal component](./src/Modal.js). Any properties you add to `Dialog.Container` are mapped through to the modal.
The modal has an `onBackdropPress` property that can be used to register clicks on the backdrop.

Below is an example of how you can close the dialog by tapping outside.

```javascript
const [visible, setVisible] = useState(true);

const handleCancel = () => {
  setVisible(false);
};

return (
  <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
    <Dialog.Title>Title</Dialog.Title>
    <Dialog.Button label="Cancel" onPress={handleCancel} />
  </Dialog.Container>
);
```

## Acknowledgments

Thanks to the user [@honaf](https://github.com/honaf) who has kindly offered the `react-native-dialog` namespace.
Also thanks to the user [@leecade](https://github.com/leecade) who offered the namespace `react-native-alert` (which has not been used since "Dialog" seems to suit better this component) and to [@tyxou](https://github.com/tyxou) for the entire codebase refactoring to hooks.
