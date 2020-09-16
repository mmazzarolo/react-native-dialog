import PropTypes from "prop-types";
import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View, Modal } from "react-native";
import Constants from 'expo-constants';
// import AnimatedModal from "react-native-modal";

const IOS_MODAL_ANIMATION = {
  from: { opacity: 0, scale: 1.2 },
  0.5: { opacity: 1 },
  to: { opacity: 1, scale: 1 }
};

const DialogContainer = (props) => {
  const {
      blurComponentIOS,
      buttonSeparatorStyle = {},
      children,
      contentStyle = {},
      footerStyle = {},
      headerStyle = {},
      blurStyle = {},
      visible,
      ...nodeProps
    } = props;
    const titleChildrens = [];
    const descriptionChildrens = [];
    const buttonChildrens = [];
    const otherChildrens = [];
    React.Children.forEach(children, child => {
      if (!child) {
        return;
      }
      if (
        child.type.name === "DialogTitle" ||
        child.type.displayName === "DialogTitle"
      ) {
        titleChildrens.push(child);
      } else if (
        child.type.name === "DialogDescription" ||
        child.type.displayName === "DialogDescription"
      ) {
        descriptionChildrens.push(child);
      } else if (
        child.type.name === "DialogButton" ||
        child.type.displayName === "DialogButton"
      ) {
        if (Platform.OS === "ios" && buttonChildrens.length > 0) {
          buttonChildrens.push(
            <View style={[styles.buttonSeparator, buttonSeparatorStyle]} />
          );
        }
        buttonChildrens.push(child);
      } else {
        otherChildrens.push(child);
      }
    });
    return (
      <Modal
        transparent={true}
        style={styles.modal}
        visible={visible}
        animationType={(props.animationType)?props.animationType:"fade"}
        {...nodeProps}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.centeredView}
        >
          <View style={[styles.content, contentStyle]}>
            {Platform.OS === "ios" && blurComponentIOS}
            {Platform.OS === "ios" && !blurComponentIOS && (
              <View style={[styles.blur, blurStyle]} />
            )}
            <View style={[styles.header, headerStyle]}>
              {titleChildrens}
              {descriptionChildrens}
            </View>
            {otherChildrens}
            {Boolean(buttonChildrens.length) && (
              <View style={[styles.footer, footerStyle]}>
                {buttonChildrens.map((x, i) =>
                  React.cloneElement(x, {
                    key: `dialog-button-${i}`
                  })
                )}
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
}

DialogContainer.propTypes = {
  blurComponentIOS: PropTypes.node,
  buttonSeparatorStyle: PropTypes.object,
  children: PropTypes.node.isRequired,
  contentStyle: PropTypes.object,
  footerStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  blurStyle: PropTypes.object,
  visible: PropTypes.bool
};

DialogContainer.defaultProps = {
  visible: false
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  // container: {
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  blur: {
    position: "absolute",
    backgroundColor: "rgb(255,255,255)",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  content: Platform.select({
    ios: {
      width: 270,
      flexDirection: "column",
      borderRadius: 13,
      overflow: "hidden"
    },
    android: {
      flexDirection: "column",
      borderRadius: 3,
      padding: 16,
      margin: 16,
      backgroundColor: "white",
      overflow: "hidden",
      elevation: 4,
      minWidth: 300
    },
    web: {
      flexDirection: "column",
      borderRadius: 3,
      padding: 16,
      margin: 16,
      backgroundColor: "white",
      overflow: "hidden",
      elevation: 4,
      minWidth: 300
    }
  }),
  header: Platform.select({
    ios: {
      margin: 18
    },
    android: {
      margin: 12
    },
    web: {
      margin: 12
    }
  }),
  footer: Platform.select({
    ios: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopColor: "#A9ADAE",
      borderTopWidth: StyleSheet.hairlineWidth,
      height: 46
    },
    android: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: 4
    },
    web: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: 4
    }
  }),
  buttonSeparator: {
    height: "100%",
    backgroundColor: "#A9ADAE",
    width: StyleSheet.hairlineWidth
  }
});

export default DialogContainer;