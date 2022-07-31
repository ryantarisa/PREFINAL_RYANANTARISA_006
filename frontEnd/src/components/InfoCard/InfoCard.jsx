import React from "react";
import "./InfoCard.css";
import Pen from "../../img/pen.png";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as UserApi from "../../API/UserRequest.js";
import { logOut } from "../../actions/AuthAction.js";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const handleLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h3>Profile Info</h3>
        {user._id === profileUserId ? (
          <div>
            <img
              style={{ maxWidth: "15px" }}
              src={Pen}
              alt=""
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Full Name: </b>
        </span>
        <span className="infoData">
          {profileUser.firstname} {profileUser.lastname}
        </span>
      </div>

      <div className="info">
        <span>
          <b>Username: </b>
        </span>
        <span className="infoData">@{profileUser.username}</span>
      </div>

      <div className="info">
        <span>
          <b>Bio: </b>
        </span>
        <span className="infoData">
          <i>{profileUser.bio ? profileUser.bio : "Write your bio!"}</i>
        </span>
      </div>

      <div className="info">
        <span>
          <b>Email: </b>
        </span>
        <span className="infoData">{profileUser.email}</span>
      </div>
      {user.isVerified ? (
        ""
      ) : (
        <button
          className="button"
          style={{ marginTop: "10px", backgroundColor: "green" }}
        >
          Send Verification Link
        </button>
      )}

      <button className="logoutBtn" onClick={handleLogOut}>
        LOG OUT
      </button>
    </div>
  );
};

export default InfoCard;
