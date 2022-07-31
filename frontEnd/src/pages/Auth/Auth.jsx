import React from "react";
import "./Auth.css";
import Logo from "../../img/Logo-khup-color.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, register } from "../../actions/AuthAction.js";
import seePass from "../../img/seePass.png";
import unseePass from "../../img/unseePass.png";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: true,
    isVerified: false,
    profilePicture: "",
    coverPicture: "",
    bio: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.authReducer.loading);
  const errorStat = useSelector((state) => state.authReducer.error);
  const errMessage = useSelector((state) => state.authReducer.errorMessage);
  const [isRegister, setIsRegister] = useState(true);
  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const passVision = () => {
    const temp = document.getElementById("typepass");
    if (temp.type === "password") {
      temp.type = "text";
    } else {
      temp.type = "password";
    }
  };

  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isRegister) {
      data.password === data.confirmPassword
        ? dispatch(register(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(confirmPass);
    setData(initialState);
  };

  let password = document.getElementById("typepass"),
    confirm_password = document.getElementById("typeconfirmpass");

  const validatePassword = () => {
    if (password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity("");
    }
  };

  return (
    <div className="Auth">
      {/* Left */}
      <div className="authLeft">
        <img src={Logo} alt="" />
        <div className="Webname">
          <div>KUPERTALKS</div>
          <span> When Kuper Talks!</span>
        </div>
      </div>
      {/* Right */}
      <div className="authRight">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h2>{isRegister ? "Register" : "Log In"}</h2>
          {isRegister && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
              />
            </div>
          )}

          <div>
            <div>
              <input
                id="username"
                type="text"
                className="infoInput"
                name="username"
                onChange={handleChange}
                placeholder={isRegister ? "Username" : "Username or E-mail"}
                value={data.username}
                style={{ width: "26rem" }}
                required
              />
            </div>
          </div>
          {isRegister && (
            <div>
              <div>
                <input
                  id="email"
                  type="text"
                  className="infoInput"
                  name="email"
                  placeholder="E-mail"
                  onChange={handleChange}
                  value={data.email}
                  style={{ width: "26rem" }}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  title="Please insert a valid email address"
                />
              </div>
            </div>
          )}

          <div className="allPass">
            <div style={{ display: "flex" }}>
              <div className="passInput">
                <input
                  type="password"
                  className="infoInputPassword"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                  id="typepass"
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*+`~'=?\|\]\[\(\)\-<>/]).{8,}"
                  title="Requires number, symbol, uppercase and lowercase letter. At least 8 or more characters"
                />
                <div className="p-icon">
                  <img
                    src={
                      document.getElementById("typepass")?.type === "password"
                        ? seePass
                        : unseePass
                    }
                    style={{
                      maxWidth: "20px",
                      marginTop: "20px",
                      cursor: "pointer",
                    }}
                    onClick={passVision}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          {isRegister && (
            <div>
              <div>
                <input
                  type="password"
                  className="infoInput"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={data.confirmPassword}
                  style={{ width: "26rem" }}
                  required
                  id="typeconfirmpass"
                  onKeyUp={validatePassword}
                />
              </div>
            </div>
          )}

          {/* {!isRegister ? (
            errorStat ? (
              <i
                style={{
                  color: "red",
                }}
              >
                User or Password is incorrect!
              </i>
            ) : (
              ""
            )
          ) : ( */}
          <i
            style={{
              color: "red",
            }}
          >
            {errMessage}
          </i>
          {/* // )} */}

          <div>
            <span
              style={{
                fontWeight: "lighter",
                // margin: "60px",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsRegister((prev) => !prev);
                resetForm();
              }}
            >
              {isRegister
                ? "Already have an account? Log In"
                : "New Here? Register now"}
            </span>
          </div>
          <button className="button regButton" type="submit" disabled={loading}>
            {loading ? "Loading..." : isRegister ? "Register" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Auth;
