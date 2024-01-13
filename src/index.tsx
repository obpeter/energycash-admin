import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {ReactKeycloakProvider} from '@react-keycloak/web'

import {AuthClientInitOptions} from "@react-keycloak/core/lib/types";
import {store} from './redux/store';
import {Provider} from "react-redux";
import {CssBaseline} from "@mui/material";
import Keycloak from "keycloak-js";
import {AuthProvider} from "react-oidc-context";
import {User, UserManager, WebStorageStateStore} from "oidc-client-ts";
import {EegService} from "./services/eeg.service";
import TenantProvider from "./hooks/EegContext";
import {authService} from "./services/auth.service";

// export const userManager = new UserManager({
//   authority: "http://localhost:8180/auth/realms/vfeeg/",
//   client_id: "eegfaktura-app",
//   redirect_uri: "http://localhost:3000",
//   userStore: new WebStorageStateStore({store: window.sessionStorage}),
// })
//
// export const eegService = new EegService(userManager)

const keycloakConfig = {
  url: "https://login.ourproject.at/auth/realms/VFEEG/",
  client_id: "at.ourproject.vfeeg.admin",
  // redirect_uri: "https://admin.eegfaktura.at"
  redirect_uri: "http://localhost:3001"
}

const keycloakConfigTest = {
  url: "http://localhost:8180/auth/realms/vfeeg/",
  client_id: "eegfaktura-app",
  redirect_uri: "http://localhost:3000"
}


// const oidcConfig = {
//   authority: keycloakConfig.url,
//   client_id: keycloakConfig.client_id,
//   redirect_uri: keycloakConfig.redirect_uri,
//   onSigninCallback: (_user: User | void): void => {
//     window.history.replaceState(
//       {},
//       document.title,
//       window.location.pathname
//     )
//   },
//   revokeAccessTokenOnSignout: true,
//   userStore: new WebStorageStateStore({
//     store: sessionStorage
//   }),
//
//   // userManager: userManager,
//   // ...
// };


const oidcConfig = {
  onSigninCallback: (_user: User | void): void => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    )
  },

  userManager: authService,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider {...oidcConfig}>
        <TenantProvider>
          <CssBaseline/>
          <App/>
        </TenantProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
