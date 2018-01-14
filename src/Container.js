import React from "react";
import PropTypes from "prop-types";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import AnimatedModal from "react-native-modal";
import { BlurView } from "react-native-blur";

export default class DialogContainer extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    visible: false
  };

  render() {
    const { visible, children, ...otherProps } = this.props;
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
        backdropOpacity={0.4}
        style={styles.modal}
        isVisible={visible}
        animationIn={"zoomIn"}
        animationOut={"fadeOut"}
        {...otherProps}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <View style={styles.content}>
            {Platform.OS === "ios" && (
              <BlurView
                style={styles.blur}
                blurType={"xlight"}
                blurAmount={10}
              />
            )}
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
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  content: Platform.select({
    ios: {
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
      margin: 20
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
      height: 52
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
