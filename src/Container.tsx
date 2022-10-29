import * as React from "react";
import { PropsWithChildren, ReactElement, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  PlatformColor,
  ViewStyle,
  StyleProp,
} from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import Modal from "./Modal";
import useTheme, { StyleBuilder } from "./useTheme";
import PropTypes from "prop-types";
import DialogTitle, { DialogTitleProps } from "./Title";
import DialogDescription, { DialogDescriptionProps } from "./Description";
import DialogButton, { DialogButtonProps } from "./Button";

type TitleElement = ReactElement<DialogTitleProps, typeof DialogTitle>;
type DescriptionElement = ReactElement<
  DialogDescriptionProps,
  typeof DialogDescription
>;
type ButtonElement = ReactElement<DialogButtonProps, typeof DialogButton>;

const iOS = Platform.OS === "ios";

export type DialogContainerProps = PropsWithChildren<{
  children: JSX.Element | JSX.Element[];
  blurComponentIOS?: ReactNode;
  buttonSeparatorStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  blurStyle?: StyleProp<ViewStyle>;
  visible?: boolean;
  verticalButtons?: boolean;
  onBackdropPress?: () => void;
  onRequestClose?: () => void;
  keyboardVerticalOffset?: number;
  useNativeDriver?: boolean;
}>;

const DialogContainer: React.FC<DialogContainerProps> = (props) => {
  const {
    blurComponentIOS,
    buttonSeparatorStyle,
    children,
    contentStyle,
    footerStyle,
    headerStyle,
    blurStyle,
    visible = false,
    verticalButtons = false,
    keyboardVerticalOffset = 40,
    ...nodeProps
  } = props;
  const titleChildrens: TitleElement[] = [];
  const descriptionChildrens: DescriptionElement[] = [];
  const buttonChildrens: (ButtonElement | JSX.Element)[] = [];
  const otherChildrens: ReactNode[] = [];
  const { styles } = useTheme(buildStyles);
  React.Children.forEach(children, (child) => {
    if (typeof child === "object" && child !== null && "type" in child) {
      const displayName = child.type?.displayName || child.type?.name;
      switch (displayName) {
        case DialogTitle.displayName:
          titleChildrens.push(child as TitleElement);
          return;
        case DialogDescription.displayName:
          descriptionChildrens.push(child as DescriptionElement);
          return;
        case DialogButton.displayName:
          if (Platform.OS === "ios" && buttonChildrens.length > 0) {
            buttonChildrens.push(
              <View
                style={[
                  verticalButtons
                    ? styles.buttonSeparatorVertical
                    : styles.buttonSeparatorHorizontal,
                  buttonSeparatorStyle,
                ]}
              />
            );
          }
          buttonChildrens.push(child as ButtonElement);
          return;
      }
    }
    otherChildrens.push(child);
  });
  return (
    <Modal
      renderToHardwareTextureAndroid={true}
      transparent={true}
      visible={visible}
      {...nodeProps}
    >
      <KeyboardAvoidingView
        behavior={iOS ? "padding" : undefined}
        keyboardVerticalOffset={iOS ? keyboardVerticalOffset : undefined}
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
            <>
              {Platform.OS === "ios" && (
                <View style={styles.buttonSeparatorVertical} />
              )}
              <View
                style={[
                  styles.footer,
                  verticalButtons ? styles.footerVertical : null,
                  footerStyle,
                ]}
              >
                {buttonChildrens.map((x, i) =>
                  React.cloneElement(x, {
                    key: `dialog-button-${i}`,
                  })
                )}
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

DialogContainer.propTypes = {
  blurComponentIOS: PropTypes.node,
  buttonSeparatorStyle: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  footerStyle: ViewPropTypes.style,
  headerStyle: ViewPropTypes.style,
  blurStyle: ViewPropTypes.style,
  visible: PropTypes.bool,
  verticalButtons: PropTypes.bool,
  onBackdropPress: PropTypes.func,
  keyboardVerticalOffset: PropTypes.number,
  useNativeDriver: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

const buildStyles: StyleBuilder = () =>
  StyleSheet.create({
    centeredView: {
      marginTop: 22,
    },
    blur: {
      position: "absolute",
      backgroundColor: PlatformColor("systemGray6"), // "rgb(255,255,255)",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    content: Platform.select({
      ios: {
        width: 270,
        //backgroundColor: PlatformColor("systemGray6"),
        flexDirection: "column",
        borderRadius: 13,
        overflow: "hidden",
      },
      android: {
        backgroundColor: PlatformColor("?attr/colorBackgroundFloating"),
        flexDirection: "column",
        borderRadius: 3,
        padding: 16,
        margin: 16,
        overflow: "hidden",
        elevation: 4,
        minWidth: 300,
      },
      web: {
        flexDirection: "column",
        borderRadius: 3,
        padding: 16,
        margin: 16,
        backgroundColor: "white",
        overflow: "hidden",
        elevation: 4,
        minWidth: 300,
      },
      default: {},
    }),
    header: Platform.select({
      ios: {
        margin: 18,
      },
      android: {
        margin: 12,
      },
      web: {
        margin: 12,
      },
      default: {},
    }),
    footer: {
      flexDirection: "row",
      ...Platform.select({
        ios: {
          justifyContent: "space-between",
        },
        android: {
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 4,
        },
        web: {
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 4,
        },
        default: {},
      }),
    },
    footerVertical: {
      flexDirection: "column",
    },
    buttonSeparatorHorizontal: {
      height: "100%",
      backgroundColor: PlatformColor("separator"), //"#A9ADAE",
      width: StyleSheet.hairlineWidth,
    },
    buttonSeparatorVertical: {
      width: "100%",
      backgroundColor: PlatformColor("separator"), //"#A9ADAE",
      height: StyleSheet.hairlineWidth,
    },
  });

export default DialogContainer;
