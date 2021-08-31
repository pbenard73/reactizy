export default `/* src/index.js */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Store } from 'reactizy'
import Hoc from './hocs/Hoc'

ReactDOM.render(
  <React.StrictMode>
    <Store pool={[Hoc]}>
       <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)`
