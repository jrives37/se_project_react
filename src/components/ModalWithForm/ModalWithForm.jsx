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
  secondaryButtonText,
  onSecondaryButtonClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} modal_type_${name}`}>
      <div className="modal__content-add">
        <button type="button" className="modal__close" onClick={onClose}>
          <img className="closex" src={closex} alt="close icon" />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}

          <div className="modal__buttons">
            <button className="garment__add" type="submit">
              {buttonText}
            </button>

            {secondaryButtonText && (
              <button
                className="modal__secondary-button"
                type="button"
                onClick={onSecondaryButtonClick}
              >
                or {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
