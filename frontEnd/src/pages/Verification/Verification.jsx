import React from "react";
import Logo from "../../img/Logo-khup-color.png";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Verification.css";
import { verifyUser } from "../../actions/userAction.js";
import { logOut } from "../../actions/AuthAction.js";

const Verification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    dispatch(verifyUser(user));
  }, []);

  const handleLogOut = () => {
    window.location = `/auth`;
    dispatch(logOut());
  };

  return (
    <div className="Verif">
      {/* Verif Left */}
      <div className="authLeft">
        <img src={Logo} alt="" />
        <div className="Webname">
          <div>KUPERTALKS</div>
          <span> When Kuper Talks!</span>
        </div>
      </div>
      {/* Verif Right */}
      <div className="verifRight">
        <h2>
          Your account is <b style={{ color: "green" }}>VERIFIED</b>!
        </h2>
        <span style={{ fontWeight: "lighter" }}>
          Click the button below to relog your account. Enjoy{" "}
          <b style={{ color: "orange" }}>KUPERTALKS</b>!
        </span>
        <button
          onClick={handleLogOut}
          //   onClick={() => (window.location = `/auth`)}
          className="button regButton homeVerifBtn"
        >
          LOG IN
        </button>
      </div>
    </div>
  );
};
export default Verification;
