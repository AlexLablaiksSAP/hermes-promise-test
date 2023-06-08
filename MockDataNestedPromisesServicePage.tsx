import React, {Component} from 'react';
import {Alert, Button, FlatList, Text, TextStyle, View} from 'react-native';

import {ObjectCellView} from './ObjectCellView';

import {IObjectCell} from './IObjectCell';
import {getObjectCells as get1kObjectCells} from './MockDataServiceObjectCells1k';
import {getObjectCells as get10kObjectCells} from './MockDataServiceObjectCells10k';

interface Props {
  onGoBack?: () => void;
}

interface State {
  data: Array<IObjectCell>;
}

export class MockDataNestedPromisesServicePage extends Component<Props, State> {
  state: {data: Array<IObjectCell>} = {data: []};
  private toUpper = true;

  private formatKeyValue(
    key: string,
    value: string,
  ): Promise<[string, string]> {
    return new Promise(resolve => {
      const resolvedValue = this.toUpper
        ? value.toUpperCase()
        : value.toLowerCase();
      resolve([key, resolvedValue]);
    });
  }

  private formatObjectCell(objectCell: IObjectCell): Promise<IObjectCell> {
    const fieldPromises: Array<Promise<[string, string]>> = [];

    for (const key of Object.keys(objectCell)) {
      fieldPromises.push(this.formatKeyValue(key, objectCell[key]));
    }

    return new Promise(resolve => {
      Promise.all(fieldPromises).then((tuples: [string, string][]) => {
        const objectCell: Record<string, string> = {};
        for (const tuple of tuples) {
          objectCell[tuple[0]] = tuple[1];
        }
        resolve(objectCell as IObjectCell);
      });
    });
  }

  private async getObjectCells(
    getObjectCells: () => Array<IObjectCell>,
  ): Promise<void> {
    const start = new Date();
    const objectCells = getObjectCells();
    const end = new Date();
    const durationMs = end.getTime() - start.getTime();

    console.log(
      `populated ${objectCells.length} object cells in ${durationMs} ms`,
    );
    this.setState({data: objectCells});
  }

  private onGet1kObjectCells(): void {
    this.getObjectCells(get1kObjectCells);
  }

  private onGet10kObjectCells(): void {
    this.getObjectCells(get10kObjectCells);
  }

  private onFormat(): void {
    const start = new Date();

    const objectCellPromises: Array<Promise<IObjectCell>> = [];
    for (const objectCell of this.state.data) {
      objectCellPromises.push(this.formatObjectCell(objectCell));
    }

    this.toUpper = !this.toUpper;
    Promise.all(objectCellPromises).then((objectCells: Array<IObjectCell>) => {
      const end = new Date();
      const durationMs = end.getTime() - start.getTime();
      console.log(
        `formatted ${objectCells.length} object cells in ${durationMs} ms`,
      );

      Alert.alert(
        'Measured Time',
        `formatted ${objectCells.length} object cells in ${durationMs} ms`,
      );

      this.setState({data: objectCells});
    });
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
          title="Main Screen"
          onPress={() => {
            if (this.props.onGoBack) this.props.onGoBack();
          }}
        />
        <Button
          title="Get 1K Object Cells"
          onPress={() => this.onGet1kObjectCells()}
        />
        <Button
          title="Get 10K Object Cells"
          onPress={() => this.onGet10kObjectCells()}
        />
        <Button title="Format" onPress={() => this.onFormat()} />
        <FlatList
          data={this.state.data}
          renderItem={ObjectCellView.renderItem}
          keyExtractor={(item: IObjectCell) => item._id}
        />
      </View>
    );
  }
}
