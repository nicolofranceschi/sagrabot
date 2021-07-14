
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
