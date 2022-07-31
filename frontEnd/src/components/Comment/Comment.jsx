import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./Comment.css";

const Comment = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { post } = useSelector((state) => state.postReducer);
  return (
    <div className="comment">
      <div
        style={{
          fontSize: "smaller",
          fontWeight: "lighter",
          marginTop: "auto",
          color: "orange",
        }}
      >
        {user.username}
      </div>
      <i style={{ marginLeft: "15px", fontWeight: "lighter" }}>
        wow inspirasi nih!
      </i>
    </div>
  );
};

export default Comment;
