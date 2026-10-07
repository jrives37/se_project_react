import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,

  handleCardLike,
  handleLogout,
  handleEditProfileClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleLogout={handleLogout}
      />

      <ClothesSection
        clothingItems={clothingItems.filter(
          (item) => item.owner === currentUser._id,
        )}
        onCardClick={handleCardClick}
        onAddClick={handleAddClick}
        onCardLike={handleCardLike}
      />
    </section>
  );
}
