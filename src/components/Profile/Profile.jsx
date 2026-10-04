import { useState } from "react";
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
        clothingItems={clothingItems}
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
