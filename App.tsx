/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {MockDataServiceView} from './MockDataServiceView';

const hermesVersion =
  global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'] ?? '';
const engineText = hermesVersion
  ? `Engine: Hermes ${hermesVersion}`
  : 'Engine: Chakra';

export default class App extends Component {
  public override render(): JSX.Element {
    return (
      <View>
        <Text>{engineText}</Text>
        <MockDataServiceView />
      </View>
    );
  }
}
