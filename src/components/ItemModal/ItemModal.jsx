import "./ItemModal.css";
import closex from "../../assets/closex.png";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img className="closex" src={closex} />
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <div className="modal__weather">Weather: {card.weather}</div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
