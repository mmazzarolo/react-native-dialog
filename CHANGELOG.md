# [8.2.0](https://github.com/mmazzarolo/react-native-dialog/compare/v8.1.1...v8.2.0) (2021-07-19)


### Features

* Handle hardware back button on Android ([#114](https://github.com/mmazzarolo/react-native-dialog/issues/114)) ([e9b6cf5](https://github.com/mmazzarolo/react-native-dialog/commit/e9b6cf583cb5070cbb4c542ec9569e29fae3877a))

## [8.1.1](https://github.com/mmazzarolo/react-native-dialog/compare/v8.1.0...v8.1.1) (2021-07-15)


### Bug Fixes

* **title:** children prop allows node instead of string ([#112](https://github.com/mmazzarolo/react-native-dialog/issues/112)) ([8290768](https://github.com/mmazzarolo/react-native-dialog/commit/8290768e73cf22e85404c6ebec9a328a3f0bf022))

# [8.1.0](https://github.com/mmazzarolo/react-native-dialog/compare/v8.0.1...v8.1.0) (2021-07-12)


### Features

* Added support for vertical buttons ([bebc3d0](https://github.com/mmazzarolo/react-native-dialog/commit/bebc3d040bdc0749e5bfbdc3c05ceebfaec7c8d5))

## [8.0.1](https://github.com/mmazzarolo/react-native-dialog/compare/v8.0.0...v8.0.1) (2021-04-18)


### Bug Fixes

* Mark "textInputRef" and "blurComponentIOS" as optional ([#103](https://github.com/mmazzarolo/react-native-dialog/issues/103)) ([c92fe5d](https://github.com/mmazzarolo/react-native-dialog/commit/c92fe5d1492bbe55d06c7af4dec2be653360640f))

# [8.0.0](https://github.com/mmazzarolo/react-native-dialog/compare/v7.0.0...v8.0.0) (2021-04-17)


### Features

* Use TypeScript in the codebase and expose TypeScript type-definitions ([#101](https://github.com/mmazzarolo/react-native-dialog/issues/101)) ([77d41f6](https://github.com/mmazzarolo/react-native-dialog/commit/77d41f6f5fae17650245684c10ab3de3df93e76b))


### BREAKING CHANGES

* Previous type definitions used in your app may not be compatible with this release anymore.

# [7.0.0](https://github.com/mmazzarolo/react-native-dialog/compare/v6.2.0...v7.0.0) (2021-04-16)


### Features

* Add support for dark mode ([#100](https://github.com/mmazzarolo/react-native-dialog/issues/100)) ([57b065e](https://github.com/mmazzarolo/react-native-dialog/commit/57b065e1524e64f28b7a07ebd8062d7b1982cc76))


### BREAKING CHANGES

* We are now using the native colors instead of the hardcoded ones — which means that if your react-native app is using a specific accent/primary color it will be now shown correctly in the dialog.

# [6.2.0](https://github.com/mmazzarolo/react-native-dialog/compare/v6.1.2...v6.2.0) (2021-02-19)


### Features

* add keyboardVerticalOffset support for iOS ([#93](https://github.com/mmazzarolo/react-native-dialog/issues/93)) ([f44d21b](https://github.com/mmazzarolo/react-native-dialog/commit/f44d21bbe72183c129fba72b79440af26c348b1e))

## [6.1.2](https://github.com/mmazzarolo/react-native-dialog/compare/v6.1.1...v6.1.2) (2020-10-24)


### Bug Fixes

* Always cover the whole screen (even with translucent status bar)  ([#85](https://github.com/mmazzarolo/react-native-dialog/issues/85)) ([09b2f35](https://github.com/mmazzarolo/react-native-dialog/commit/09b2f3584890be76fd56d3e2719ea928e8130ebf))

## [6.1.1](https://github.com/mmazzarolo/react-native-dialog/compare/v6.1.0...v6.1.1) (2020-10-18)


### Bug Fixes

* Added onBackdropPress on proptypes & docs update ([8b273d4](https://github.com/mmazzarolo/react-native-dialog/commit/8b273d45e76502d9366db2f6888bfc911ab6b1a1))

# [6.1.0](https://github.com/mmazzarolo/react-native-dialog/compare/v6.0.1...v6.1.0) (2020-10-17)


### Features

* Improved animation fidelity ([63ffbce](https://github.com/mmazzarolo/react-native-dialog/commit/63ffbce5f0e0fa63604529589815b94fc1625c85))
* Improved animation fidelity ([4480c0e](https://github.com/mmazzarolo/react-native-dialog/commit/4480c0e4c1622d8a29287112c07ba6e0c7ae2d8a))

## [6.0.1](https://github.com/mmazzarolo/react-native-dialog/compare/v6.0.0...v6.0.1) (2020-10-17)


### Bug Fixes

* Fix onBackdropPress trigger ([9a8865e](https://github.com/mmazzarolo/react-native-dialog/commit/9a8865ecbfb1fcc567dbea07235f3c3831b76c4c))
