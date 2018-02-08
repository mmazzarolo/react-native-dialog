import React from "react";
import PropTypes from "prop-types";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import AnimatedModal from "react-native-modal";

const IOS_MODAL_ANIMATION = {
  from: { opacity: 0, scale: 1.2 },
  0.5: { opacity: 1 },
  to: { opacity: 1, scale: 1 }
};

export default class DialogContainer extends React.PureComponent {
  static propTypes = {
    blurComponentIOS: PropTypes.node,
    children: PropTypes.node.isRequired,
    visible: PropTypes.bool
  };

  static defaultProps = {
    visible: false
  };

  render() {
    const { blurComponentIOS, children, visible, ...otherProps } = this.props;
    const titleChildrens = [];
    const descriptionChildrens = [];
    const buttonChildrens = [];
    const otherChildrens = [];
    React.Children.forEach(children, child => {
      if (child.type.name === "DialogTitle") {
        titleChildrens.push(child);
      } else if (child.type.name === "DialogDescription") {
        descriptionChildrens.push(child);
      } else if (child.type.name === "DialogButton") {
        if (Platform.OS === "ios" && buttonChildrens.length > 0) {
          buttonChildrens.push(<View style={styles.buttonSeparator} />);
        }
        buttonChildrens.push(child);
      } else {
        otherChildrens.push(child);
      }
    });
    return (
      <AnimatedModal
        backdropOpacity={0.3}
        style={styles.modal}
        isVisible={visible}
        animationIn={Platform.OS === "ios" ? IOS_MODAL_ANIMATION : "zoomIn"}
        animationOut={"fadeOut"}
        {...otherProps}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <View style={styles.content}>
            {Platform.OS === "ios" && blurComponentIOS}
            {Platform.OS === "ios" &&
              !blurComponentIOS && <View style={styles.blur} />}
            <View style={styles.header}>
              {titleChildrens}
              {descriptionChildrens}
            </View>
            {otherChildrens}
            <View style={styles.footer}>
              {buttonChildrens.map((x, i) =>
                React.cloneElement(x, {
                  key: `dialog-button-${i}`
                })
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </AnimatedModal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  blur: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255, 0.8)",
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
    }
  }),
  buttonSeparator: {
    height: "100%",
    backgroundColor: "#A9ADAE",
    width: StyleSheet.hairlineWidth
  }
});
