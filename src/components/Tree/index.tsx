import * as React from 'react';
import { Node } from '../../types';
import styled from 'styled-components';

export const TreeContext = React.createContext({ collapsible: false, sorted: false });

const Item = styled.div<{ depth: number }>`
  width: 100%;
  margin-left: ${props => (props.depth > 0 ? `${props.depth * 8}px` : '0')};
`;

const Children = styled.div<{ shown?: boolean }>`
  display: ${props => (props.shown ? 'block' : 'none')};
`;

interface Props {
  data: Node[];
}

interface State {
  collapsed: string[];
}

export default class Tree extends React.Component<Props, State> {
  static contextType = TreeContext;
  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: [],
    };
  }

  public childClickHandler(id: string) {
    if (this.state.collapsed.indexOf(id) === -1) {
      this.setState({
        collapsed: [...this.state.collapsed, id],
      });
    } else {
      this.setState({
        collapsed: this.state.collapsed.filter((i: string) => i !== id),
      });
    }
  }

  public sort(nodeA: Node, nodeB: Node) {
    const a = nodeA.text.toUpperCase();
    const b = nodeB.text.toUpperCase();
    return a < b ? -1 : a > b ? 1 : 0;
  }

  public renderNode(node: Node, depth: number, id: string) {
    console.log(this.context);
    return (
      <Item depth={depth}>
        {this.context.collapsible ? (
          <a onClick={() => this.childClickHandler(id)}>{node.text}</a>
        ) : (
          node.text
        )}
        <Children shown={this.state.collapsed.indexOf(id) === -1}>
          {node.children &&
            (this.context.sorted ? node.children.sort(this.sort) : node.children).map((n: Node) =>
              this.renderNode(n, depth + 1, n.text + depth)
            )}
        </Children>
      </Item>
    );
  }

  public render() {
    const { data } = this.props;
    return (
      <div>
        {(this.context.sorted ? data.sort(this.sort) : data).map((n: Node) =>
          this.renderNode(n, 0, n.text)
        )}
      </div>
    );
  }
}
