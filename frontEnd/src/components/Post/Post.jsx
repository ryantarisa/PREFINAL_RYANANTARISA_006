import React from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/notlike.png";
import Notlike from "../../img/like.png";
import Dots from "../../img/dots.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "../../API/PostRequest.js";
import PostModal from "../PostModal/PostModal.jsx";
import CommentList from "../Comment/Comment.jsx";

const Post = ({ data }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [likes, setLikes] = useState(data.likes.length);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  // console.log(data);
  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
        onClick={() => (window.location = `/post/${data._id}`)}
        style={{ cursor: "pointer" }}
        post={data}
      />

      <div className="postReact">
        <img
          src={liked ? Notlike : Heart}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
        {data.username === user.username ? (
          <div>
            <img
              src={Dots}
              alt=""
              style={{
                maxWidth: "25px",
                marginRight: "0px",
                cursor: "pointer",
              }}
              onClick={() => setModalOpened(true)}
            />
            <PostModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
              post={data}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <span className="postLikes">{likes} likes</span>
      <div className="detail">
        <span>
          <b>{data.username}</b>
        </span>
        <span className="postDesc"> {data.desc}</span>
        <span className="postDate">{data.createdAt.slice(0, -14)}</span>
      </div>

      <form className="formComment" action="">
        <img
          className="profilePost"
          style={{
            width: "35px",
            height: "35px",
            marginTop: "auto",
            marginBottom: "auto",
            borderRadius: "100%",
            objectFit: "cover",
          }}
          src={
            user.coverPicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.jpg"
          }
          alt=""
        />
        <input
          maxLength={300}
          type="text"
          className="infoInput inputComment"
          placeholder="write a comment"
        />
      </form>
      {/* <CommentList /> */}
    </div>
  );
};

export default Post;
