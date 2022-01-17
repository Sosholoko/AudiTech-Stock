import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutButton from "./LogOutButton";
import "../style/profile.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className="profile_section">
        <br />
        <img src={user.picture} alt={user.name}></img>
        <p>
          <i class="fas fa-user-circle"></i> {user.name}
        </p>
        <br />
        <LogOutButton />
      </div>
    )
  );
};

export default Profile;
