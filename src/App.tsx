import { useState } from 'react'
import SankeyDiagram from './components/SankeyDiagram';

import './App.css'

const data = {
  nodes: [
    { name: 'Node A', startNode: true, size: 20},
    { name: 'Node B', startNode: true, size: 20 },
    { name: 'Node C', startNode: true, size: 10},
    { name: 'Node D'},
    { name: 'Node E' },
    { name: 'Node F'},
  ],
  links: [
    { source: 'Node A', target: 'Node B', value: 10 },
    { source: 'Node B', target: 'Node C', value: 5 },
    { source: 'Node B', target: 'Node D', value: 8 },
    { source: 'Node C', target: 'Node E', value: 3 },
    { source: 'Node D', target: 'Node E', value: 2 },
    { source: 'Node D', target: 'Node F', value: 4 },
  ],
};

function App() {

  return (
    <div>
      <h1>Sankey Diagram</h1>
      <SankeyDiagram data={data} width={500} height={300} />
    </div>
  )
}

export default App