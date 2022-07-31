import { Modal } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../actions/userAction.js";
import { uploadImage } from "../../API/UploadRequest.js";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const errStatus = useSelector((state) => state.authReducer.error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;

      console.log(fileName);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(params.id, UserData));
    // console.log(UserData);
    setModalOpened(true);
    alert("Profile Updated!");
  };

  return (
    <Modal
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h2>Your Info</h2>
        <div>
          <input
            required
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            required
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            required
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            style={
              errStatus
                ? { marginRight: "-16px", borderRadius: "8px 0px 0px 8px" }
                : { marginRight: "0", borderRadius: "8px 8px 8px 8px" }
            }
          />
          {errStatus ? (
            <div
              style={{
                color: "red",
                fontSize: "10px",
                backgroundColor: "var(--inputColor)",
                padding: "20px 10px 20px 0px",
                borderRadius: "0px 8px 8px 0px",
              }}
            >
              Username already exist!
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="bio"
            placeholder="Bio"
            onChange={handleChange}
            value={formData.bio}
          />
        </div>

        <div>
          <input
            disabled
            type="text"
            className="infoInput"
            name="email"
            placeholder={formData.email}
          />
        </div>
        <i
          style={{
            display: "flex",
            alignSelf: "flex-end",
            marginRight: "45px",
            paddingTop: "0px",
            color: "red",
            fontSize: "15px",
          }}
        >
          *You can't change your E-mail
        </i>

        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>
        <button className="button regButton" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
