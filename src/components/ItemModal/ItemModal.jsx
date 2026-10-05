import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

import closex from "../../assets/closex.png";

function ItemModal({ isOpen, onClose, onDelete, card }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;
  return (
    <div className={`item-modal ${isOpen ? "item-modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img className="closex" src={closex} alt="Close modal" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <div className="modal__weather">Weather: {card.weather}</div>
        </div>
        {isOwn && (
          <button
            onClick={() => onDelete(card._id)}
            type="button"
            className="modal__delete"
          >
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
