import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your items</p>
        <button>+ Add new</button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((filteredCard) => {
          return (
            <ItemCard
              key={filteredCard._id}
              item={filteredCard}
              onCardClick={onCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
