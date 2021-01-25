export default `// index.js
import App from './App';
import * as serviceWorker from './serviceWorker';

import login from './reduxers/login'
import pets from './reduxers/pets'

import { Store } from 'reactizy'

import { withRouter } from 'react-router-dom'

import AlertTemplate from 'react-alert-template-basic'

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const hocs = {
    alert: withAlert(),
    router: withRouter
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alertOptions}> // The react-alert Provider
      <Store reduxers={[login, pets]} uses={hocs}>
        <App />
      </Store>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
`
