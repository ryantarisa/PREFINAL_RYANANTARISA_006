import React from "react";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import "./Profile.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard.jsx";
import PostSide from "../../components/PostSide/PostSide.jsx";
// import PostSideProfile from "../../components/PostSideProfile/PostSideProfile.jsx";

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="ProfileRight">
        <ProfileCard />
        <PostSide />
      </div>
    </div>
  );
};

export default Profile;
