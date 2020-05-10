import React from 'react';
import ReactDOM from 'react-dom';

import { WalletProvider } from 'contexts/WalletContext';

import App from './App';

import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <WalletProvider>
    <App />
  </WalletProvider>,
  document.getElementById('blockparty-wallet')
);
