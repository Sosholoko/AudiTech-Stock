import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogOutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <button
        style={{
          border: "none",
          padding: "10px",
          marginTop: "10px",
          marginLeft: "30px",
          borderRadius: "10px",
          backgroundColor: "rgb(190, 80, 80)",
          color: "white",
          cursor: "pointer"
        }}
        onClick={() => logout()}
      >
        Log Out <i class="fas fa-sign-out-alt"></i>
      </button>
    )
  );
};

export default LogOutButton;
