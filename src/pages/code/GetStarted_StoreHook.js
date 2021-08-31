export default `/* src/index.js */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Store } from 'reactizy'
import useReactizy from './hooks/useReactizy'

ReactDOM.render(
  <React.StrictMode>
    <Store pool={[useReactizy]}>
       <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
)`
