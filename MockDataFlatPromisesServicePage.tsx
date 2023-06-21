import React, { Component } from 'react';
import { Alert, Button, FlatList, Text, TextStyle, View } from 'react-native';

import { type IObjectCell } from './IObjectCell';
import { ObjectCellView } from './ObjectCellView';
import { MockDataFlatPromisesService } from './MockDataFlatPromisesService';

interface Props {
	onGoBack?: () => void;
}

interface State {
	objectCellIter: number;
}

function onReport(msg: string): void {
	Alert.alert('Measured Time', msg);
}

export class MockDataFlatPromisesServicePage extends Component<Props, State> {
	private _mockDataFlatPromisesService: MockDataFlatPromisesService = new MockDataFlatPromisesService(onReport);

	constructor(props: Props) {
		super(props);

		this.state = { objectCellIter: 0 };
	}

	private onFormat(): void {
		this._mockDataFlatPromisesService.format().then(() => {
			let iter = this.state.objectCellIter;
			this.setState({ objectCellIter: ++iter });
		});
	}

	private onGet1kObjectCells(): void {
		this._mockDataFlatPromisesService.populate1kObjectCells();
	}

	private onGet10kObjectCells(): void {
		this._mockDataFlatPromisesService.populate10kObjectCells();
	}

	public override render(): JSX.Element {
		const titleStyle: TextStyle = {
			textAlign: 'center',
			fontSize: 40,
		};

		return (
			<View>
				<Text style={titleStyle}>Mock Data with Flat Promises</Text>
				<Button
					disabled={!(this.props.onGoBack instanceof Function)}
					title='Main Screen'
					onPress={() => {
						if (this.props.onGoBack) this.props.onGoBack();
					}}
				/>
				<Button title='Get 1K Object Cells' onPress={() => this.onGet1kObjectCells()} />
				<Button title='Get 10K Object Cells' onPress={() => this.onGet10kObjectCells()} />
				<Button title='Format' onPress={() => this.onFormat()} />
				<FlatList
					data={this._mockDataFlatPromisesService.objectCells}
					renderItem={ObjectCellView.renderItem}
					keyExtractor={(item: IObjectCell) => item._id}
				/>
			</View>
		);
	}
}
