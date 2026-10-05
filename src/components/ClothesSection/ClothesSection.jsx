import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="youritems">Your items</p>
        <button className="button-add" onClick={onAddClick}>
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
      </ul>
    </div>
  );
}
