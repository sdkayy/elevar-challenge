import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/Tree';
import { Node } from './types';
import Collapsible from './components/Tree/collapsible';
import styled from 'styled-components';
import Sortable from './components/Tree/sortable';
import Collapsiblesortable from './components/Tree/collapsiblesortable';

const DisplayShowcase = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  padding: 8px;
`;

const DisplayHeading = styled.p`
  font-size: 16px;
  padding: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid black;
  font-weight: 400;
`;

const Showcase = styled.div`
  width: 50%;
`;

const Container = styled.div`
  width: 100%;
  padding: 12px;
`;

const DisplayCard = styled.div`
  width: 50%;
  margin: 32px auto;
  padding: 12px;
  border-radius: 6px;
  background: white;
  box-shadow: 0px 0px 24px -4px rgba(0, 0, 0, 0.75);
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ActionGroup = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 50%;
`;

const Button = styled.button`
  border: 1px solid black;
  background: black;
  color: white;
  padding: 8px;
  font-size: 14px;
  text-trasnform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  ${props => props.disabled && `opacity: .5; cursor: not-allowed;`}

  &:hover {
    background: white;
    color: black;
    opacity: ${props => (props.disabled ? '0.5' : '1')};
  }

  &:focus {
    outline: none;
  }
`;

interface State {
  showcase: number;
}

class App extends React.Component<{}, State> {
  public state: State = {
    showcase: 0,
  };

  public render() {
    const { showcase } = this.state;
    const data: Node[] = [
      {
        text: 'Movies',
        children: [
          {
            text: 'Horror',
            children: [
              {
                text: 'Halloween',
              },
              {
                text: 'Alien',
              },
            ],
          },
          {
            text: 'Action',
            children: [
              {
                text: 'Stone Cold',
              },
              {
                text: 'Commando',
              },
            ],
          },
        ],
      },
      {
        text: 'Books',
        children: [
          {
            text: 'Children of time',
          },
        ],
      },
    ];
    return (
      <Container>
        <DisplayCard>
          {showcase === 0 && (
            <div>
              <DisplayHeading>Normal</DisplayHeading>
              <DisplayShowcase>
                <Tree data={data} />
              </DisplayShowcase>
            </div>
          )}
          {showcase === 1 && (
            <div>
              <DisplayHeading>Collapsible (Undirect child vs Direct child)</DisplayHeading>
              <DisplayShowcase>
                <Showcase>
                  <Collapsible>
                    <div>
                      <Tree data={data} />
                    </div>
                  </Collapsible>
                </Showcase>
                <Showcase>
                  <Collapsible>
                    <Tree data={data} />
                  </Collapsible>
                </Showcase>
              </DisplayShowcase>
            </div>
          )}
          {showcase === 2 && (
            <div>
              <DisplayHeading>Sortable (Undirect child vs Direct child)</DisplayHeading>
              <DisplayShowcase>
                <Showcase>
                  <Sortable>
                    <div>
                      <Tree data={data} />
                    </div>
                  </Sortable>
                </Showcase>
                <Showcase>
                  <Sortable>
                    <Tree data={data} />
                  </Sortable>
                </Showcase>
              </DisplayShowcase>
            </div>
          )}
          {showcase === 3 && (
            <div>
              <DisplayHeading>Collapsible & Sortable </DisplayHeading>
              <DisplayShowcase>
                <Showcase>
                  <Collapsiblesortable>
                    <Tree data={data} />
                  </Collapsiblesortable>
                </Showcase>
              </DisplayShowcase>
            </div>
          )}
          <ActionGroup>
            <Button
              onClick={() =>
                this.setState({
                  showcase: showcase !== 0 ? showcase - 1 : 0,
                })
              }
              disabled={showcase === 0}
            >
              Back
            </Button>
            <Button
              onClick={() =>
                this.setState({
                  showcase: showcase !== 3 ? showcase + 1 : 3,
                })
              }
              disabled={showcase === 3}
            >
              Next
            </Button>
          </ActionGroup>
        </DisplayCard>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
