import * as React from "react";

export const SignInContext = React.createContext(null);

//
export function useIsSignedIn() {
  const isSignedIn = React.useContext(SignInContext);
  return isSignedIn;
}

export function useIsSignedOut() {
  return !useIsSignedIn();
}
