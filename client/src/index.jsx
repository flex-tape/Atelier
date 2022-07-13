import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App.jsx';

const root = createRoot(document.getElementById('app'));
root.render(<App />);
//ReactDOM.render(<App/>, document.getElementById('app'));