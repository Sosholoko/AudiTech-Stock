import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button
        style={{
          border: "none",
          padding: "20px",
          fontSize: "20px",
          marginTop: "10px",
          borderRadius: "10px",
          backgroundColor: "rgb(67, 180, 114)",
          color: "white",
          marginTop: "100px",
          cursor: "pointer"
        }}
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    )
  );
};

export default LoginButton;
