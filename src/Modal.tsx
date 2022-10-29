import * as React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  Easing,
  Modal as ReactNativeModal,
  ModalProps as ReactNativeModalProps,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";

const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.3;

const CONTENT_ANIMATION_IN = Platform.select({
  ios: {
    opacity: {
      inputRange: [0, 1],
      outputRange: [0, 1],
    },
    scale: {
      inputRange: [0, 0.5, 1],
      outputRange: [1.2, 1.1, 1],
    },
  },
  android: {
    opacity: {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    },
    scale: {
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    },
  },
  default: {
    opacity: {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    },
    scale: {
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    },
  },
});

const CONTENT_ANIMATION_OUT = Platform.select({
  default: {
    opacity: {
      inputRange: [0, 1],
      outputRange: [0, 1],
    },
  },
});

export interface ModalProps extends ReactNativeModalProps {
  onBackdropPress?: () => void;
  onHide?: () => void;
  visible?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  useNativeDriver?: boolean;
}

interface ModalState {
  visible: boolean;
  currentAnimation: "none" | "in" | "out";
}

export class Modal extends Component<ModalProps, ModalState> {
  static propTypes = {
    onBackdropPress: PropTypes.func,
    onHide: PropTypes.func,
    visible: PropTypes.bool,
    contentStyle: ViewPropTypes.style,
    useNativeDriver: PropTypes.bool,
  };

  static defaultProps: Partial<ModalProps> = {
    onBackdropPress: () => null,
    onHide: () => null,
    visible: false,
    useNativeDriver: false,
  };

  state: ModalState = {
    visible: Boolean(this.props.visible),
    currentAnimation: "none",
  };

  animVal = new Animated.Value(0);
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (this.state.visible) {
      this.show();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps: ModalProps) {
    if (this.props.visible && !prevProps.visible) {
      this.show();
    } else if (!this.props.visible && prevProps.visible) {
      this.hide();
    }
  }

  show = () => {
    this.setState({ visible: true, currentAnimation: "in" }, () => {
      Animated.timing(this.animVal, {
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: Boolean(this.props.useNativeDriver),
        duration: MODAL_ANIM_DURATION,
        toValue: 1,
      }).start(() => {
        this.setState({ currentAnimation: "none" });
      });
    });
  };

  hide = () => {
    this.setState({ currentAnimation: "out" }, () => {
      Animated.timing(this.animVal, {
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: Boolean(this.props.useNativeDriver),
        duration: MODAL_ANIM_DURATION,
        toValue: 0,
      }).start(() => {
        if (this._isMounted) {
          this.setState({ currentAnimation: "none" });
          this.setState({ visible: false }, this.props.onHide);
        }
      });
    });
  };

  render() {
    const { children, onBackdropPress, contentStyle, ...otherProps } =
      this.props;
    const { currentAnimation, visible } = this.state;

    const backdropAnimatedStyle = {
      opacity: this.animVal.interpolate({
        inputRange: [0, 1],
        outputRange: [0, MODAL_BACKDROP_OPACITY],
      }),
    };

    const contentAnimatedStyle =
      currentAnimation === "in"
        ? {
            opacity: this.animVal.interpolate({
              inputRange: CONTENT_ANIMATION_IN.opacity.inputRange,
              outputRange: CONTENT_ANIMATION_IN.opacity.outputRange,
              extrapolate: "clamp",
            }),
            transform: [
              {
                scale: this.animVal.interpolate({
                  inputRange: CONTENT_ANIMATION_IN.scale.inputRange,
                  outputRange: CONTENT_ANIMATION_IN.scale.outputRange,
                  extrapolate: "clamp",
                }),
              },
            ],
          }
        : {
            opacity: this.animVal.interpolate({
              inputRange: CONTENT_ANIMATION_OUT.opacity.inputRange,
              outputRange: CONTENT_ANIMATION_OUT.opacity.outputRange,
              extrapolate: "clamp",
            }),
          };

    return (
      <ReactNativeModal
        transparent
        animationType="none"
        {...otherProps}
        visible={visible}
      >
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
        </TouchableWithoutFeedback>
        {visible && (
          <Animated.View
            style={[styles.content, contentAnimatedStyle, contentStyle]}
            pointerEvents="box-none"
            // Setting "needsOffscreenAlphaCompositing" solves a janky elevation
            // animation on android. We should set it only while animation
            // to avoid using more memory than needed.
            // See: https://github.com/facebook/react-native/issues/23090
            needsOffscreenAlphaCompositing={["in", "out"].includes(
              currentAnimation
            )}
          >
            {children}
          </Animated.View>
        )}
      </ReactNativeModal>
    );
  }
}

const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Modal;
