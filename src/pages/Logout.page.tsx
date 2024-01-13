import React, {FC, useEffect} from "react";
import {useAuth} from "react-oidc-context";
import {CircularProgress} from "@mui/material";


const LogoutPage: FC = () => {
  const auth = useAuth();

  useEffect(() => {
    const logout = async () => {
      // Don't do anything while a oidc action is ongoing
      if (auth.activeNavigator) return;

      // Logout page opened while logged in
      if (auth.isAuthenticated) {
        auth.signoutRedirect({
          post_logout_redirect_uri: window.location.origin,
        });
        return;
      }

      // Logout page was called while not being logged in
      if (!auth.isAuthenticated /*&& !CONFIG.legacyLoginEnabled*/) {
        try {
          await auth.signinSilent();
          auth.signoutRedirect({
            post_logout_redirect_uri: window.location.origin,
          });
        } catch (error) {
          // no SSO session active; clear user
          auth.removeUser();
          auth.signinRedirect();
        }
        return;
      }

      // window.location.href = RoutesEnum.LOGIN;
    };

    logout();
  }, [auth.isAuthenticated]);

  return (
    <CircularProgress />
  )
}