import { Modal } from "@mantine/core";

function ProfileModal({ modalOpened, setModalOpened }) {
  return (
    <Modal
      overlayOpacity={0.55}
      overlayBlur={3}
      size="50%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <PostShare />
    </Modal>
  );
}

export default ProfileModal;
