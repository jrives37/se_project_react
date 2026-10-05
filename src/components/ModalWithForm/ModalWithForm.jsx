import "./ModalWithForm.css";
import closex from "../../assets/closex.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} modal_type_${name}`}>
      <div className="modal__content-add">
        <button type="button" className="modal__close" onClick={onClose}>
          <img className="closex" src={closex} alt="close icon" />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form name={name} onSubmit={onSubmit}>
          {children}

          <button className="garment__add" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
