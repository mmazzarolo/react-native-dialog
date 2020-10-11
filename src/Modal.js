import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  DeviceEventEmitter,
  Dimensions,
  Easing,
  Modal as ReactNativeModal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.4;

const IOS_CONTENT_ANIMATION = {
  from: { opacity: 0, scale: 1.2 },
  0.5: { opacity: 1, scale: 1.1 },
  to: { opacity: 1, scale: 1 },
};

const ANDROID_CONTENT_ANIMATION = {
  from: { opacity: 0, scale: 0.3 },
  0.5: { opacity: 1, scale: 0.7 },
  to: { opacity: 1, scale: 1 },
};

const OTHER_OS_CONTENT_ANIMATION = {
  from: { opacity: 0, scale: 0.3 },
  0.5: { opacity: 1, scale: 0.7 },
  to: { opacity: 1, scale: 1 },
};

export class Modal extends Component {
  static propTypes = {
    onBackdropPress: PropTypes.func,
    onHide: PropTypes.func,
    visible: PropTypes.bool,
    contentStyle: PropTypes.any,
  };

  static defaultProps = {
    onBackdropPress: () => null,
    onHide: () => null,
    visible: false,
  };

  state = {
    visible: this.props.visible,
    deviceWidth: Dimensions.get("window").width,
    deviceHeight: Dimensions.get("window").height,
  };

  animVal = new Animated.Value(0);
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (this.state.visible) {
      this.show();
    }
    DeviceEventEmitter.addListener(
      "didUpdateDimensions",
      this.handleDimensionsUpdate
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener(
      "didUpdateDimensions",
      this.handleDimensionsUpdate
    );
    this._isMounted = false;
  }

  componentDidUpdate(prevProps: ModalPropsType) {
    if (this.props.visible && !prevProps.visible) {
      this.show();
    } else if (!this.props.visible && prevProps.visible) {
      this.hide();
    }
  }

  handleDimensionsUpdate = (dimensionsUpdate) => {
    const deviceWidth = dimensionsUpdate.window.width;
    const deviceHeight = dimensionsUpdate.window.height;
    if (
      deviceWidth !== this.state.deviceWidth ||
      deviceHeight !== this.state.deviceHeight
    ) {
      this.setState({ deviceWidth, deviceHeight });
    }
  };

  show = () => {
    this.setState({ visible: true });
    Animated.timing(this.animVal, {
      easing: Easing.inOut(Easing.quad),
      // Using native driver in the modal makes the content flash
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 1,
    }).start();
  };

  hide = () => {
    Animated.timing(this.animVal, {
      easing: Easing.inOut(Easing.quad),
      // Using native driver in the modal makes the content flash
      useNativeDriver: false,
      duration: MODAL_ANIM_DURATION,
      toValue: 0,
    }).start(() => {
      if (this._isMounted) {
        this.setState({ visible: false }, this.props.onHide);
      }
    });
  };

  render() {
    const {
      children,
      onBackdropPress,
      contentStyle,
      ...otherProps
    } = this.props;
    const { deviceHeight, deviceWidth, visible } = this.state;

    const backdropAnimatedStyle = {
      opacity: this.animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, MODAL_BACKDROP_OPACITY],
      }),
    };

    const contentAnimationSteps = Platform.select({
      ios: [
        IOS_CONTENT_ANIMATION.from,
        IOS_CONTENT_ANIMATION["0.5"],
        IOS_CONTENT_ANIMATION.to,
      ],
      android: [
        ANDROID_CONTENT_ANIMATION.from,
        ANDROID_CONTENT_ANIMATION["0.5"],
        ANDROID_CONTENT_ANIMATION.to,
      ],
      default: [
        OTHER_OS_CONTENT_ANIMATION.from,
        OTHER_OS_CONTENT_ANIMATION["0.5"],
        OTHER_OS_CONTENT_ANIMATION.to,
      ],
    });

    const contentAnimatedStyle = {
      opacity: this.animVal.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: contentAnimationSteps.map((x) => x.opacity),
        extrapolate: "clamp",
      }),
      transform: [
        {
          scale: this.animVal.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: contentAnimationSteps.map((x) => x.scale),
            extrapolate: "clamp",
          }),
        },
      ],
    };
    return (
      <ReactNativeModal
        transparent
        animationType="none"
        visible={visible}
        {...otherProps}
      >
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              backdropAnimatedStyle,
              { width: deviceWidth, height: deviceHeight },
            ]}
          />
        </TouchableWithoutFeedback>
        {visible && (
          <Animated.View
            style={[styles.content, contentAnimatedStyle, contentStyle]}
            pointerEvents="box-none"
          >
            {children}
          </Animated.View>
        )}
      </ReactNativeModal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0,
  },
  content: {
    flex: 1,
  },
});

export default Modal;
