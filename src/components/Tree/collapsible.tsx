import * as React from 'react';
import { TreeContext } from '.';

interface State {
  collapsible: boolean;
  sorted: boolean;
}

export default class Collapsible extends React.Component<{}, State> {
  public state: State = {
    collapsible: true,
    sorted: false,
  };
  public render() {
    return <TreeContext.Provider value={this.state}>{this.props.children}</TreeContext.Provider>;
  }
}
