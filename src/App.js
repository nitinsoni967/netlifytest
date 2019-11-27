import React from 'react';
import logo from './logo.svg';
import './App.css';
import loadingGif from './loader1.gif'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={loadingGif} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React with continous integration confirmed
        </a>
      </header>
    </div>
  );
}

export default App;
