import {User, UserManager, WebStorageStateStore} from "oidc-client-ts";

import { AuthProviderProps } from "react-oidc-context";
// import {keycloakConfig} from "../../../keycloak";
// import {authService} from "../../../services/auth.service";

const isBrowser = typeof window !== "undefined";

export const rootUrl = isBrowser
  ? `${window.location.protocol}//${window.location.host}${window.location.host === 'localhost' ? ':' + window.location.port : ''}`
  : "";

// const realm = keycloakConfig.realm;
// const client_id = keycloakConfig.client_id;
//
// const appFolder = "/";
// const authority = keycloakConfig.url;

export const oidcConfig: AuthProviderProps = {
  // authority,
  // client_id,
  // redirect_uri: `${rootUrl}${appFolder}`,
  post_logout_redirect_uri: rootUrl,
  /**
   * removes code and state from url after signin
   * see https://github.com/authts/react-oidc-context/blob/f175dcba6ab09871b027d6a2f2224a17712b67c5/src/AuthProvider.tsx#L20-L30
   */
  // onSigninCallback: () => {
  //   window.history.replaceState({}, document.title, window.location.pathname);
  // },
  onSigninCallback: (_user: User | void): void => {
    // Remove OIDC params from URL, but don't remove other params that might be present
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("state");
    searchParams.delete("code");
    searchParams.delete("session_state");
    const newUrl = searchParams.toString().length
      ? `${window.location.pathname}?${searchParams.toString()}`
      : window.location.pathname;
    console.log("Clean Window location", newUrl)
    window.history.replaceState({}, document.title, newUrl);
  },
  /**
   * we need to store the user in local storage, to access the token. The alternative would
   * be to read it from the user object returned from useAuth, but as only the enterprise
   * edition uses oidc, we would have to conditionally call the hook, which is not possible.
   */
  // userStore: isBrowser
  //   ? new WebStorageStateStore({
  //     store: window.localStorage,
  //   })
  //   : undefined,
  userStore: new WebStorageStateStore({
    store: sessionStorage
  }),
  // userManager: authService as UserManager,
};

// export const getOidcUser = () => {
//   const oidcStorage = localStorage.getItem(
//     `oidc.user:${authority}:${client_id}`
//   );
//   if (!oidcStorage) {
//     return null;
//   }
//
//   return User.fromStorageString(oidcStorage);
// };