import React from 'react';
import SortingAlgorithmVisualizer from './SortingAlgorithmVisualizer/SortingAlgorithmVisualizer'
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <SortingAlgorithmVisualizer></SortingAlgorithmVisualizer>
      </Router>
    </div>
  );
}

export default App;
