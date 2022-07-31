import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import authReducer from "../../reducers/authReducer";
import postReducer from "../../reducers/postReducer";
import { editPost, getPost, delPost } from "../../actions/postAction.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { get } from "mongoose";

function PostModal({ modalOpened, setModalOpened, post }) {
  const [confimrModalOpened, setConfirmModalOpened] = useState(false);
  const { desc, ...other } = post;
  const [postDesc, setPostDesc] = useState(desc);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setPostDesc(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let DescData = {};
    const data = new FormData();
    const userId = user._id;

    data.append("userId", userId);
    data.append("desc", postDesc);

    data.forEach((value, key) => (DescData[key] = value));

    dispatch(editPost(post._id, DescData));
    setModalOpened(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    let DescData = {};
    const data = new FormData();
    const userId = user._id;

    data.append("userId", userId);
    data.forEach((value, key) => (DescData[key] = value));

    dispatch(delPost(post._id, DescData));
    console.log("id user:", DescData);
    setModalOpened(false);
  };

  const deleteConfirm = () => {
    return (
      <button
        className="button regButton"
        style={{
          height: "30px",
          width: "100%",
          marginBottom: "10px",
          marginTop: "20px",
          backgroundColor: "Green",
        }}
      >
        Yes
      </button>
    );
  };

  return (
    <Modal
      withCloseButton={false}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      overlayBlur={3}
      centered
    >
      <div sty>
        <div>Edit post's caption:</div>
        <input
          className="infoInput"
          type="text"
          onChange={handleChange}
          value={postDesc}
          style={{
            marginTop: "10px",
            width: "90%",
            borderRadius: "8px 8px 0px 0px",
          }}
        />
        <button
          className="button"
          style={{
            height: "30px",
            width: "100%",
            marginBottom: "20px",
            borderRadius: "0px 0px 8px 8px",
          }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <hr />
      <div>
        <button
          className="button regButton"
          style={{
            height: "30px",
            width: "100%",
            marginBottom: "10px",
            marginTop: "20px",
            backgroundColor: "red",
          }}
          onClick={() => setConfirmModalOpened(true)}
        >
          Delete Post
        </button>
        <Modal
          opened={confimrModalOpened}
          onClose={() => setConfirmModalOpened(false)}
          title="Are you sure want to delete this post?"
          centered
        >
          <div
            style={{ display: "flex", justifyContent: "center", gap: "15px" }}
          >
            <button
              className="button regButton"
              style={{ backgroundColor: "green" }}
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="button regButton"
              style={{ backgroundColor: "red" }}
              onClick={() => setConfirmModalOpened(false)}
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    </Modal>
  );
}

export default PostModal;
