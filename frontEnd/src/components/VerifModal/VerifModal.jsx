import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

function VerifModal({ modalOpened, setModalOpened, data }) {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <Modal
      withCloseButton={false}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      overlayBlur={3}
      size="50%"
    >
      {user.isVerified ? (
        <div>
          Your Account is <b style={{ color: "green" }}>Verified</b>! enjoy
          KUPERTALKS
        </div>
      ) : (
        <div>
          Your Account is <b style={{ color: "red" }}>Not Verified</b> yet.
          Please check your registered email for a verification email, and click
          the verification link
        </div>
      )}
    </Modal>
  );
}

export default VerifModal;
