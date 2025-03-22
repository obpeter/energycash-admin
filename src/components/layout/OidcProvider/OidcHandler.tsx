import {FC, PropsWithChildren, useEffect, useState} from "react";
import {hasAuthParams, useAuth} from "react-oidc-context";
import {Alert, CircularProgress} from "@mui/material";

export const OidcHandler: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    console.log("Load Oidc Handler")
  }, []);

  useEffect(() => {
    (async () => {
      if (
        !hasAuthParams() &&
        !auth.isAuthenticated &&
        !auth.activeNavigator &&
        !auth.isLoading &&
        !hasTriedSignin
      ) {
        await auth.signinRedirect();
        setHasTriedSignin(true);
      }
    })()
  }, [auth, hasTriedSignin]);


  useEffect(() => {
    // the `return` is important - addAccessTokenExpiring() returns a cleanup function
    return auth.events.addAccessTokenExpiring(() => {
      // if (alert("You're about to be signed out due to inactivity. Press continue to stay signed in.")) {
      //   auth.signinSilent();
      // }
    })
  }, [auth.events, auth.signinSilent]);

  if (auth.error) {
    return (
      <div className="full-screen-center">
        <Alert>
          {auth.error.name}: {auth.error.message}
        </Alert>
      </div>
    );
  }

  if (auth.isLoading) {
    return (
      <div className="full-screen-center">
        <CircularProgress />
      </div>
    );
  }

  return <>{children}</>;
};