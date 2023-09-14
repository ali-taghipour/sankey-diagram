import { useState } from 'react'
import SankeyDiagram from './components/SankeyDiagram';

import './App.css'

const data = {
  nodes: [
    { name: 'T-Mobile', startNode: true, size: 20},
    { name: 'AT&T', startNode: true, size: 20},
    { name: 'Verizon', startNode: true, size: 20},
    { name: 'Node D'},
    { name: 'Node E' },
    { name: 'Node F'},
    { name: 'Node G'},
    { name: 'Node H' },
    { name: 'Node I'},
    { name: 'Node L'},
    { name: 'Node M' },
    { name: 'Node N'},
  ],
  links: [
    { source: 'T-Mobile', target: 'Node D', value: 10 },
    { source: 'AT&T', target: 'Node E', value: 10 },
    { source: 'Verizon', target: 'Node F', value: 10 },
    { source: 'Node D', target: 'Node G', value: 10 },
    { source: 'Node E', target: 'Node H', value: 10 },
    { source: 'Node F', target: 'Node I', value: 10 },
    { source: 'Node G', target: 'Node L', value: 10 },
    { source: 'Node H', target: 'Node M', value: 10 },
    { source: 'Node I', target: 'Node N', value: 10 },
  ],
};

function App() {

  return (
    <div>
      <h3>Layer_3_Message_LTE_RRC_Msg</h3>
      <SankeyDiagram data={data} width={600} height={400}  />
    </div>
  )
}

export default App