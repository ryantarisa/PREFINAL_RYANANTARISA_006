import React from "react";
import Logo from "../../img/Logo-khup-color.png";
import Home from "../../img/home.png";
import HomeColored from "../../img/homeColored.png";
import Notif from "../../img/notif.png";
import Comment from "../../img/comment.png";
import Setting from "../../img/setting.png";
import redNoti from "../../img/redNoti.png";
import "./Menu.css";
import Modal from "@mantine/core";
import { useState } from "react";
import VerifModal from "../VerifModal/VerifModal.jsx";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [isVerified, setIsVerified] = useState(false);
  return (
    <div className="Menu">
      <div className="fullLogo">
        <img className="circleLogo" src={Logo} alt="" />
        <div className="textLogo">KUPERTALKS</div>
      </div>
      <hr className="menuLine" />
      <div className="navIcons">
        <img
          onClick={() => (window.location = `/home`)}
          style={{ cursor: "pointer" }}
          src={Home}
          alt=""
        />
        <div className="notification">
          <img
            src={Notif}
            alt=""
            onClick={() => setModalOpened(true)}
            style={{ cursor: "pointer" }}
          />
          {user.isVerified ? (
            ""
          ) : (
            <img className="redNoti" src={redNoti} alt="" />
          )}
        </div>
        <VerifModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={user}
        />
        <img src={Comment} alt="" />
        <img src={Setting} alt="" />
      </div>
      <hr className="menuLine" />
    </div>
  );
};

export default Menu;
