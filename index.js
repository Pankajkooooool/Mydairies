import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NoteState from './context/notes/NoteState';


ReactDOM.render(
  <React.StrictMode>
    <NoteState>
    <Router>
      <App />
    </Router>
    </NoteState>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
