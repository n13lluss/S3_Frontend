import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <Router>
    <Auth0Provider
      domain="dev-gunjd4s0eltjv0ks.us.auth0.com"
      clientId="jWnWVmMDm14stl7bj8H3dcwns6O4IyXw"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
      }}
    >
      <App />
  </Auth0Provider>
  </Router>
);
