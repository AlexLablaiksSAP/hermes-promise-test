import React, {PureComponent} from 'react';
import {Text, View, ViewStyle} from 'react-native';

import {IObjectCell} from './IObjectCell';

export interface IObjectCellViewProps {
  item: IObjectCell;
}

export class ObjectCellView extends PureComponent<IObjectCellViewProps> {
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
