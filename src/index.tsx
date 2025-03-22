import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {store} from './redux/store';
import {Provider} from "react-redux";
import {CssBaseline} from "@mui/material";

import {Api, EegService} from "./services/eeg.service";
import TenantProvider from "./hooks/EegContext";
import {OidcProvider} from "./components/layout/OidcProvider";
import {AppConfig, globalConfigUrl} from "./config";
import {UserManager, UserManagerSettings} from "oidc-client-ts";
import {AuthService} from "./services/auth.service";

const initApiServices = (config: AppConfig): UserManager => {

  const userManagerConfig = {
    authority: `${config.authServerUrl.replace(/\/+$/, "")}/realms/${config.realm}/`,
    client_id: config.resource,
    redirect_uri: window.location.origin,
    automaticSilentRenew: false,
  } as UserManagerSettings;

  const authService = new AuthService(userManagerConfig)

  Api.eegService = new EegService(authService)

  return authService as UserManager
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

fetch(globalConfigUrl)
  .then(c => c.json())
  .then(c => {
    const appC = c["admin"]
    return {
      authServerUrl: appC["auth-server-url"],
      realm: appC.realm,
      resource: appC.resource,
    } as AppConfig
  })
  .then(keycloakConfig => {
    const userManager = initApiServices(keycloakConfig)

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <OidcProvider _userManager={userManager}>
            <TenantProvider>
              <CssBaseline/>
              <App/>
            </TenantProvider>
          </OidcProvider>
          {/*</AuthProvider>*/}
        </Provider>
      </React.StrictMode>
    );
  })
  .catch(e => {
    console.log(e)
    root.render(
      <React.StrictMode>
        <p>Ops... Something went wrong. Try again!</p>
      </React.StrictMode>
    )
  })
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
