import React, {FC, PropsWithChildren, ReactElement, ReactNode, useEffect} from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";
import {useAuth} from "react-oidc-context";
import {Outlet} from "react-router-dom";

// const ProtectedRoute:FC<PropsWithChildren> = ({children}) => {
//   const auth = useAuth()
//   if (!auth.isAuthenticated || (auth.user ? auth.user.expires_in ? auth.user.expires_in < 10 : true : true)) {
//     auth.signinSilent()
//     return <></>;
//   }
//
//   console.log("AuthState: ", auth)
//
//   return (<>{children}</>)
// };

type Props = {
  state?: string,
  children: ReactNode;
};

const PageWrapper = (props: Props) => {
  const auth = useAuth()
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
    }
  }, [dispatch, props]);

  // if (!auth.isAuthenticated || (auth.user ? auth.user.expires_in ? auth.user.expires_in < 10 : true : true)) {
  //   auth.signinSilent()
  //   return <></>;
  // }

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;