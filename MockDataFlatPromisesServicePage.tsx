import React, {Component, PureComponent} from 'react';
import {Button, FlatList, Text, TextStyle, View, ViewStyle} from 'react-native';
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

export class MockDataFlatPromisesServicePage extends Component<Props, State> {
  state: {data: Array<IObjectCell>} = {data: []};
  private toUpper = true;
  private objectCells: Array<IObjectCell> = [];

  private fieldValueToUpper(objectCell: IObjectCell, key: string) {
    if (!(key in objectCell)) {
      return;
    }
    const value = objectCell[key];
    objectCell[key] = this.toUpper ? value.toUpperCase() : value.toLowerCase();
  }

  private onFormat(): void {
    const start = new Date();
    const promiseArray: Array<Promise<void>> = [];

    for (const objectCell of this.objectCells) {
      for (const key of Object.keys(objectCell)) {
        promiseArray.push(
          new Promise(resolve => {
            this.fieldValueToUpper(objectCell, key);
            resolve();
          }),
        );
      }
    }

    this.toUpper = !this.toUpper;
    Promise.all(promiseArray).then(() => {
      const end = new Date();
      const durationMs = end.getTime() - start.getTime();
      console.log(
        `formatted ${this.objectCells.length} object cells in ${durationMs} ms`,
      );

      this.setState({data: this.objectCells});
    });
  }

  private async getObjectCells(
    getObjectCells: () => Array<IObjectCell>,
  ): Promise<void> {
    const start = new Date();
    this.objectCells = getObjectCells();
    const end = new Date();
    const durationMs = end.getTime() - start.getTime();

    console.log(
      `populated ${this.objectCells.length} object cells in ${durationMs} ms`,
    );
    this.setState({data: this.objectCells});
  }

  private onGet1kObjectCells(): void {
    this.getObjectCells(get1kObjectCells);
  }

  private onGet10kObjectCells(): void {
    this.getObjectCells(get10kObjectCells);
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
