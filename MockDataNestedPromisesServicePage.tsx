import React, { Component } from 'react';
import { Alert, Button, FlatList, Text, TextStyle, View } from 'react-native';

import { type IObjectCell } from './IObjectCell';
import { ObjectCellView } from './ObjectCellView';
import { MockDataNestedPromisesService } from './MockDataNestedPromisesService';

interface Props {
	onGoBack?: () => void;
}

interface State {
	objectCellIter: number;
}

function onReport(msg: string): void {
	Alert.alert('Measured Time', msg);
}

export class MockDataNestedPromisesServicePage extends Component<Props, State> {
	private _mockDataNestedPromisesService = new MockDataNestedPromisesService(onReport);

	constructor(props: Props) {
		super(props);

		this.state = { objectCellIter: 0 };
	}

	private onGet1kObjectCells(): void {
		this._mockDataNestedPromisesService.populate1kObjectCells();
	}

	private onGet10kObjectCells(): void {
		this._mockDataNestedPromisesService.populate10kObjectCells();
	}

	private onFormat(): void {
		this._mockDataNestedPromisesService.format().then(() => {
			let iter = this.state.objectCellIter;
			this.setState({ objectCellIter: ++iter });
		});
	}

	private onFormat2(): void {
		eval('console.log("hello from eval");');
	}

	public override render(): JSX.Element {
		const titleStyle: TextStyle = {
			textAlign: 'center',
			fontSize: 40,
		};

		return (
			<View>
				<Text style={titleStyle}>Mock Data with Nested Promises</Text>
				<Button
					disabled={!(this.props.onGoBack instanceof Function)}
					title='Main Screen'
					onPress={() => {
						this.props.onGoBack?.();
					}}
				/>
				<Button title='Get 1K Object Cells' onPress={() => this.onGet1kObjectCells()} />
				<Button title='Get 10K Object Cells' onPress={() => this.onGet10kObjectCells()} />
				<Button title='Format' onPress={() => this.onFormat()} />
				<Button title='Format2' onPress={() => this.onFormat2()} />
				<FlatList
					data={this._mockDataNestedPromisesService.objectCells}
					renderItem={ObjectCellView.renderItem}
					keyExtractor={(item: IObjectCell) => item._id}
				/>
			</View>
		);
	}
}
