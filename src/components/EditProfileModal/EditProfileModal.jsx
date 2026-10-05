import "./EditProfileModal.css";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { updateProfile } from "../../utils/Api";
function EditProfileModal({ isOpen, onClose, setCurrentUser }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile(name, avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        onClose();
      })
      .catch(console.error);
  };
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);
  if (!isOpen) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit profile</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="url"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />

      <button type="submit">Save</button>

      <button type="button" onClick={onClose}>
        Close
      </button>
    </form>
  );
}

export default EditProfileModal;
