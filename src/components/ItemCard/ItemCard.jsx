import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      {currentUser && (
        <button
          type="button"
          onClick={() => onCardLike(item)}
          className={`card__like-button ${isLiked ? "card__like-button_active" : ""}`}
        >
          ♥
        </button>
      )}
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
