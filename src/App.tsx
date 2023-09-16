import { useState } from 'react'
import SankeyDiagram from './components/SankeyDiagram';

import './App.css'

const data = {
  nodes: [
    { name: 'T-Mobile',group:0},
    { name: 'AT&T',group:0},
    { name: 'Verisoon',group:0},
    { name: 'RRC-Connection-Request',group:1},
    { name: 'RRC-Connection-Request2',group:2},
    { name: 'RRC-Connection-Request3',group:3},
    { name: 'RRC-Connection-Request4',group:4},
    { name: 'Err1',group:4, space:true},
    { name: 'Err2',group:5},
    { name: 'Err3',group:6},
  ],
  links: [
    { source: 'T-Mobile', target: 'RRC-Connection-Request', value: 50, color:'green', nodeColor: 'red', rootNode: 'T-Mobile' },
    { source: 'AT&T', target: 'RRC-Connection-Request', value: 100, color:'skyblue', nodeColor: 'yellow', rootNode: 'AT_T' },
    { source: 'Verisoon', target: 'RRC-Connection-Request', value: 50, color:'orange', nodeColor: 'pink', rootNode: 'Verisoon' },
    { source: 'RRC-Connection-Request', target: 'RRC-Connection-Request2', value: 50, color:'green', nodeColor: 'red', rootNode: 'T-Mobile' },
    { source: 'RRC-Connection-Request', target: 'RRC-Connection-Request2', value: 100, color:'skyblue', nodeColor: 'yellow', rootNode: 'AT_T' },
    { source: 'RRC-Connection-Request', target: 'RRC-Connection-Request2', value: 50, color:'orange', nodeColor: 'pink', rootNode: 'Verisoon' },
    { source: 'RRC-Connection-Request2', target: 'RRC-Connection-Request3', value: 50, color:'green', nodeColor: 'red', rootNode: 'T-Mobile' },
    { source: 'RRC-Connection-Request2', target: 'RRC-Connection-Request3', value: 100, color:'skyblue', nodeColor: 'yellow', rootNode: 'AT_T' },
    { source: 'RRC-Connection-Request2', target: 'RRC-Connection-Request3', value: 50, color:'orange', nodeColor: 'pink', rootNode: 'Verisoon' },
    { source: 'RRC-Connection-Request3', target: 'RRC-Connection-Request4', value: 45, color:'green', nodeColor: 'red', rootNode: 'T-Mobile' },
    { source: 'RRC-Connection-Request3', target: 'RRC-Connection-Request4', value: 90, color:'skyblue', nodeColor: 'yellow', rootNode: 'AT_T' },
    { source: 'RRC-Connection-Request3', target: 'RRC-Connection-Request4', value: 40, color:'orange', nodeColor: 'pink', rootNode: 'Verisoon' },
    { source: 'RRC-Connection-Request3', target: 'Err1', value: 5, color:'green', nodeColor: 'red', rootNode: 'T-Mobile' },
    { source: 'RRC-Connection-Request3', target: 'Err1', value: 10, color:'skyblue', nodeColor: 'yellow', rootNode: 'AT_T' },
    { source: 'RRC-Connection-Request3', target: 'Err1', value: 10, color:'orange', nodeColor: 'pink', rootNode: 'Verisoon' },
    { source: 'Err1', target: 'Err2', value: 5, color:'green', nodeColor: 'red', rootNode: 'T-Mobile' },
    { source: 'Err1', target: 'Err2', value: 10, color:'skyblue', nodeColor: 'yellow', rootNode: 'AT_T' },
    { source: 'Err1', target: 'Err2', value: 10, color:'orange', nodeColor: 'pink', rootNode: 'Verisoon' },
    { source: 'Err2', target: 'Err3', value: 5, color:'green', nodeColor: 'red', rootNode: 'T-Mobile' },
    { source: 'Err2', target: 'Err3', value: 10, color:'skyblue', nodeColor: 'yellow', rootNode: 'AT_T' },
    { source: 'Err2', target: 'Err3', value: 10, color:'orange', nodeColor: 'pink', rootNode: 'Verisoon' },
  ],
};

function App() {

  return (
    <div>
      <h3>Layer_3_Message_LTE_RRC_Msg</h3>
      <SankeyDiagram data={data} width={800} height={600}  />
    </div>
  )
}

export default App