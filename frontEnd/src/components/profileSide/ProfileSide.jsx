import { Button } from "@mantine/core";
import React from "react";
import LogoSearch from "../Menu/Menu";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileSide.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard />
      <button
        onClick={() => (window.location = `/profile/${user._id}`)}
        className="button myProfileBtn"
      >
        My Profile
      </button>
    </div>
  );
};

export default ProfileSide;
