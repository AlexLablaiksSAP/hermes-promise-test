import React, {Component, PureComponent} from 'react';
import {Button, FlatList, Text, View, ViewStyle} from 'react-native';
import {getObjectCells as get1kObjectCells} from './MockDataServiceObjectCells1k';
import {getObjectCells as get10kObjectCells} from './MockDataServiceObjectCells10k';
import {IObjectCell} from './IObjectCell';

export interface IObjectCellViewProps {
  item: IObjectCell;
}

class ObjectCellView extends PureComponent<IObjectCellViewProps> {
  static viewStyle: ViewStyle = {padding: 10};

  public static renderItem(obj: IObjectCellViewProps): JSX.Element {
    return <ObjectCellView {...obj} />;
  }

  public override render(): JSX.Element {
    return (
      <View style={ObjectCellView.viewStyle}>
        <Text>Title: {this.props.item.Title}</Text>
        <Text>Subhead: {this.props.item.Subhead}</Text>
        <Text>Description: {this.props.item.Description}</Text>
        <Text>Status: {this.props.item.Status}</Text>
        <Text>Substatus: {this.props.item.Substatus}</Text>
        <Text>Footnote: {this.props.item.Footnote}</Text>
      </View>
    );
  }
}

export interface MockDataServiceViewState {
  data: Array<IObjectCell>;
}

export class MockDataServiceView extends Component<
  {},
  MockDataServiceViewState
> {
  state = {data: []};
  private objectCellsPlayground: Array<IObjectCell> = [];

  private static fieldValueToUpper(objectCell: IObjectCell, key: string) {
    if (!(key in objectCell)) {
      return;
    }
    objectCell[key] = objectCell[key].toUpperCase();
  }

  private async getObjectCellsAndFormat(
    getObjectCells: () => Array<IObjectCell>,
  ): Promise<void[]> {
    this.objectCellsPlayground = getObjectCells();
    console.log(
      `getObjectCells() returned ${this.objectCellsPlayground.length}`,
    );

    const promiseArray: Array<Promise<void>> = [];

    for (const objectCell of this.objectCellsPlayground) {
      for (const key of Object.keys(objectCell)) {
        promiseArray.push(
          new Promise(resolve => {
            MockDataServiceView.fieldValueToUpper(objectCell, key);
            resolve();
          }),
        );
      }
    }

    return Promise.all(promiseArray);
  }

  private async onGet1kObjectCellsAndFormat(): Promise<any> {
    const start = new Date();
    await this.getObjectCellsAndFormat(get1kObjectCells);
    const end = new Date();
    const durationMs = end.getTime() - start.getTime();
    console.log(
      `MockDataServiceView.getObjectCellsAndFormat: Promise.all duration: ${durationMs} ms`,
    );
    this.setState({data: this.objectCellsPlayground});
  }

  private async onGet10kObjectCellsAndFormat(): Promise<any> {
    const start = new Date();
    await this.getObjectCellsAndFormat(get10kObjectCells);
    const end = new Date();
    const durationMs = end.getTime() - start.getTime();
    console.log(
      `MockDataServiceView.getObjectCellsAndFormat: Promise.all duration: ${durationMs} ms`,
    );
    this.setState({data: this.objectCellsPlayground});
  }

  public override render(): JSX.Element {
    return (
      <View>
        <Text>Hello World</Text>
        <Button
          title="Get 1K Object Cells and Format"
          onPress={() => this.onGet1kObjectCellsAndFormat()}
        />
        <Button
          title="Get 10K Object Cells and Format"
          onPress={() => this.onGet10kObjectCellsAndFormat()}
        />
        <FlatList
          data={this.state.data}
          renderItem={ObjectCellView.renderItem}
          keyExtractor={(item: IObjectCell) => item._id}
        />
      </View>
    );
  }
}
