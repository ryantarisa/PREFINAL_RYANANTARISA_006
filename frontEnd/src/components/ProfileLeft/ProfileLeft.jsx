import React from "react";
import InfoCard from "../InfoCard/InfoCard";
import ProfileSearchBar from "../ProfileSearchBar/ProfileSearchBar";
import Menu from "../../components/Menu/Menu";

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
      <Menu />
      <ProfileSearchBar />
      <InfoCard />
    </div>
  );
};

export default ProfileLeft;
