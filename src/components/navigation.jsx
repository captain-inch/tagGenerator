import React from "react";

const Navigation = ({ onSignOut, routeChange, signedIn }) => {
  return (
    <nav className="flex w-100 flex-row justify-between ma2">
      <p
        className="dib flex ma2 f4 avenir dim pointer"
        onClick={() => routeChange("home")}
      >
        Home
      </p>
      <div className="flex justify-end">
        <p
          className="dib ma2 f4 avenir dim pointer"
          onClick={() => (signedIn ? onSignOut() : routeChange("signIn"))}
        >
          {signedIn ? "Sign Out" : "Sign in"}
        </p>
        {!signedIn ? (
          <p
            className="dib ma2 f4 avenir dim pointer"
            onClick={() => routeChange("signUp")}
          >
            Sign up
          </p>
        ) : null}
      </div>
    </nav>
  );
};
export default Navigation;
