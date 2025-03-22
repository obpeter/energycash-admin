import {FC, PropsWithChildren} from "react";
import {AuthProvider, AuthProviderProps} from "react-oidc-context";
import {OidcHandler} from "./OidcHandler";
import {rootUrl} from "./utils";
import {User, UserManager, WebStorageStateStore} from "oidc-client-ts";

const isEnterprise = true

export const OidcProvider: FC<PropsWithChildren & {_userManager: UserManager}> = ({ children, _userManager}) => {
  if (!isEnterprise) {
    return <>{children}</>;
  }

  const oidcConfig : AuthProviderProps = {
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
      userManager: _userManager,
  } as AuthProviderProps

  return (
    <AuthProvider {...oidcConfig}>
      <OidcHandler>{children}</OidcHandler>
    </AuthProvider>
  );
};