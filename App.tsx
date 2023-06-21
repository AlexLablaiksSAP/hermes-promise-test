/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { Text, TextStyle, View, Platform } from 'react-native';
import { MainPage } from './MainPage';

const otherEngine = Platform.OS === 'android' || Platform.OS === 'ios' ? 'JavaScriptCore' : 'non-Hermes (Chakra or V8)';
const hermesVersion = global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'] ?? '';
const engineText = hermesVersion ? `Engine: Hermes ${hermesVersion}` : `Engine: ${otherEngine}`;

export default class App extends Component {
	public override render(): JSX.Element {
		const engineTextStyle: TextStyle = {
			textAlign: 'right',
			paddingHorizontal: 4,
		};

		return (
			<View>
				<Text style={engineTextStyle}>{engineText}</Text>
				<MainPage />
			</View>
		);
	}
}
