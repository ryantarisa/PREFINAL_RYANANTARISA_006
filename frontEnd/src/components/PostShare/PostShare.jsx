import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profpicKuperb.png";
import "./PostShare.css";
import MediaIcon from "../../img/image.png";
import GifIcon from "../../img/gif.png";
import EmojiIcon from "../../img/happy.png";
import LinkIcon from "../../img/link.png";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction.js";

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      username: user.username,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };

  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.coverPicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.jpg"
        }
        alt=""
      />
      <div>
        <input
          disabled={!user.isVerified}
          ref={desc}
          required
          type="text"
          placeholder={
            user.isVerified ? "What's the talk?" : "Verify your account!"
          }
        />
        <div className="postOptions">
          <div className="option">
            <div className="iconText" onClick={() => imageRef.current.click()}>
              <img className="postIcon" src={MediaIcon} alt="" />
              Media
            </div>
            <div className="iconText">
              <img className="postIcon" src={LinkIcon} alt="" />
              Link
            </div>
            <div className="iconText">
              <img className="postIcon" src={GifIcon} alt="" />
              GIF
            </div>
            <div className="iconText">
              <img className="postIcon" src={EmojiIcon} alt="" />
              Emoji
            </div>
            {user.isVerified ? (
              <button
                className="shareButton button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Share"}
              </button>
            ) : (
              <button
                className="shareButton button"
                onClick={handleSubmit}
                disabled
              >
                Share
              </button>
            )}

            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
