import React, {useContext} from 'react';
import './App.css';
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {hasAuthParams, useAuth} from "react-oidc-context";
import {TenantContext} from "./hooks/EegContext";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material";

export const IDENTITY_CONFIG = {
  response_type: "id_token token",
  automaticSilentRenew: false,
  loadUserInfo: false,
};

export const METADATA_OIDC = {
};

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#2B6860',
    },
    secondary: {
      main: '#dc631e',
    },
    background: {
      default: '#EAE7D9',
      paper: '#f9f7ec',
    },
  },
};
const theme = createTheme(themeOptions)

function App() {
  const auth = useAuth()
  const {setTenants} = useContext(TenantContext)
  // automatically sign-in
  React.useEffect(() => {
    if (!hasAuthParams() &&
      !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
      auth.signinRedirect();
    }
  }, [auth.isAuthenticated, auth.activeNavigator, auth.isLoading, auth.signinRedirect]);

  React.useEffect(() => {
    // the `return` is important - addAccessTokenExpiring() returns a cleanup function
    return auth.events.addUserLoaded(cb => {
      console.log(cb.profile)
      // console.log("Profile-Tenants", cb.profile['tenants'])
      // setTenants(cb.profile['tenants'] as string[])
    })
  }, [auth.events, auth.signinSilent]);
  //
  // if (auth.activeNavigator) {
  //   return <div>Signing you in/out...</div>;
  // }
  // if (!auth.isAuthenticated) {
  //   return <div>Unable to log in</div>;
  // }
  return (
    <ThemeProvider theme={theme}>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
