import * as React from 'react';
import { TreeContext } from '.';

export default (props: any) => (
  <TreeContext.Provider value={{ collapsible: false, sorted: true }}>
    {props.children}
  </TreeContext.Provider>
);
