import React from "react";
import SearchLogo from "../../img/search.png";
import "./SearchBar.css";
import FollowersCard from "../FollowersCard/FollowersCard";

const SearchBar = () => {
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
      <FollowersCard />
    </div>
  );
};

export default SearchBar;
