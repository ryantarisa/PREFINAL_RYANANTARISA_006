import React from "react";
import SearchLogo from "../../img/search.png";
import "../SearchBar/SearchBar.css";

const ProfileSearchBar = () => {
  return (
    <div className="RightSide">
      <div className="LogoSearch">
        <div className="Search">
          <input type="text" placeholder="#KuperTalks" />
          <div className="s-icon">
            <img src={SearchLogo} style={{ maxWidth: "20px" }} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSearchBar;
