import React from "react";
import "./FollowersCard.css";
import { Followers } from "../../Data/FollowersData";

const FollowersCard = () => {
  return (
    <div className="FollowersCard">
      <h2>Who To Follow</h2>
      {Followers.map((follower, id) => {
        return (
          <div key={id} className="follower">
            <div className="imgDiv">
              <img src={follower.img} alt="" className="followerImg" />
              <div className="name">
                <span>{follower.name}</span>
                <span>{follower.username}</span>
              </div>
            </div>
            <button className="button followersBtn">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
