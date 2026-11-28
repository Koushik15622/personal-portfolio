import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { backendUrl } from './backendUrl';
import reportWebVitals from './reportWebVitals';

// Shared links enter on the portfolio domain; Express resolves their destination.
const shortLink = /^\/s\/([A-Za-z0-9_-]{1,64})\/?$/.exec(window.location.pathname);
if (shortLink) {
  window.location.replace(backendUrl("/s/" + shortLink[1]));
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

reportWebVitals();
