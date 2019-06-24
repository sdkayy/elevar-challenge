import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/Tree';
import { Node } from './types';
import Collapsible from './components/Tree/collapsible';
import styled from 'styled-components';
import Sortable from './components/Tree/sortable';

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

  @media (max-width: 768px) {
    width: 90%;
  }
`;

class App extends React.Component<{}, {}> {
  public render() {
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
          <DisplayHeading>Normal</DisplayHeading>
          <DisplayShowcase>
            <Tree data={data} />
          </DisplayShowcase>
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
          <DisplayHeading>Collapsible & Sortable </DisplayHeading>
          <DisplayShowcase>
            <Showcase>
              <Sortable>
                <Collapsible>
                  <Tree data={data} />
                  <Tree data={data} />
                </Collapsible>
              </Sortable>
            </Showcase>
          </DisplayShowcase>
        </DisplayCard>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
