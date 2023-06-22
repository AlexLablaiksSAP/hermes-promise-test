# Hermes Promise Testing (within React Native)

Primarily used to demonstrate the performance of Hermes vs the other React Native JavaScript engines, such as Chakra & JavaScriptCore (Windows and Android/iOS, respectively).

## Description

There are observable differences between the Hermes and Chakra JavaScript engines when a large amount of promises are processed. This was originally tracked against [microsoft/hermes-windows issue #92](https://github.com/microsoft/hermes-windows/issues/92). However, the latest configurations in this library suggest that the issue also persists on Android as well. This project was overhauled to test with Hermes directly for [facebook/hermes issue #1024](https://github.com/facebook/hermes/issues/1024)

An application may want to format / sanitize individual fields on data returned from a back-end; such as a Date Time format, capitalization, etc. Likely, this would be done with asynchronous or promise based functions running. This example project seeks to demonstrate that behavior for large data sets of 1,000 and 10,000.

## Getting Started

### Prerequisites

This repository contains a git submodule to [hermes-promise-cli](https://github.com/AlexLablaiksSAP/hermes-promise-cli) and requires initialization before usage. Please either clone with the `--recurse-submodules` or perform the following after cloning:
1. `git submodule init`
2. `git submodule update`

#### Android / iOS Client

* Perform the necessary configuration steps outlined at React Native's [Setting up the development environment (Version 0.71)](https://reactnative.dev/docs/0.71/environment-setup).

> **Warning**
> iOS has not been tested (but should work)

#### Windows Client

* Perform the necessary configuration steps outlined at React Native for Windows' [Get Started with Windows](https://microsoft.github.io/react-native-windows/docs/getting-started) for 0.71.

## Building & Running
Assuming the prerequisites have been fulfilled, using standard React Native command line arguments are all that is needed.

### Android / iOS Client

1. `yarn install`
2. `yarn react-native start` in one terminal.
3. `yarn react-native run-android` or `yarn react-native run-ios` in another terminal.

> **Note**
> Switching between Hermes and JavaScriptCore is possible by following the directions at [Switching back to JavaScriptCore (Version 0.71)](https://reactnative.dev/docs/0.71/hermes#switching-back-to-javascriptcore).

### Windows Client

1. `yarn install`
2. Follow the next steps documented at [Running a React Native Windows App](https://microsoft.github.io/react-native-windows/docs/getting-started#running-a-react-native-windows-app) as directions differ depending on whether the command line is used or the Visual Studio IDE.

> **Note**
> Switching between Hermes and Chakra is possible by toggling the `UseHermes` field in `windows/ExperimentalFeatures.props`; as noted at [Using Hermes in an existing project](https://microsoft.github.io/react-native-windows/docs/hermes#using-hermes-in-an-existing-project).

## Usage
1. First select which promise structure to test. Nested Promises consists of multiple promise layers when formatting the fields of each object retrieved, while Flat Promises consists of one promise per field of every object. See the submodule repository code for details.
   ![image](https://github.com/AlexLablaiksSAP/hermes-promise-test/assets/12348315/b17802f0-1646-4dc6-8df6-ba8dd2700105)
3. On the following screen, first choose an object size to simulate fetching. Note, the console will report the time the fetch took, though this is not the purpose of the test.
4. Click on Format, which will then launch a promise chain which changes the casing for every field of every object. The metro bundler will have console entries for the times and a pop up will display for Release mode.
