import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

import {MockDataNestedPromisesServicePage} from './MockDataNestedPromisesServicePage';
import {MockDataFlatPromisesServicePage} from './MockDataFlatPromisesServicePage';

interface IMainPageState {
  page?: JSX.Element;
}

export class MainPage extends Component<{}, IMainPageState> {
  public override render(): JSX.Element {
    if (this.state?.page) {
      return this.state.page;
    }

    return (
      <View>
        <Button
          title="Mock Data with Nested Promises"
          onPress={() =>
            this.setState({
              page: (
                <MockDataNestedPromisesServicePage
                  onGoBack={() => this.setState({page: undefined})}
                />
              ),
            })
          }
        />
        <Button
          title="Mock Data with Flat Promises"
          onPress={() =>
            this.setState({
              page: (
                <MockDataFlatPromisesServicePage
                  onGoBack={() => this.setState({page: undefined})}
                />
              ),
            })
          }
        />
      </View>
    );
  }
}
