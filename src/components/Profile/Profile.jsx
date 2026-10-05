import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  setCurrentUser,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };
  return (
    <section className="profile">
      <SideBar />

      <button type="button" onClick={handleEditProfileClick}>
        Edit Profile
      </button>

      <ClothesSection
        clothingItems={clothingItems.filter(
          (item) => item.owner === currentUser._id,
        )}
        onCardClick={handleCardClick}
        onAddClick={handleAddClick}
      />
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        setCurrentUser={setCurrentUser}
      />
    </section>
  );
}
