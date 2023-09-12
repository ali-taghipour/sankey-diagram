import { useState } from 'react'
import SankeyDiagram from './components/SankeyDiagram';

import './App.css'

const data = {
  nodes: [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
  ],
  links: [
    { source: 0, target: 1, value: 10 },
    { source: 1, target: 2, value: 5 },
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