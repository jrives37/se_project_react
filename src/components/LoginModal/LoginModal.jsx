import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/hooks/useForm";

function LoginModal({ isOpen, onClose, handleLogin, handleRegisterClick }) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, resetForm } = useForm(defaultValues);
  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(values.email, values.password);
  };
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);
  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryButtonText="Sign up"
      onSecondaryButtonClick={handleRegisterClick}
    >
      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
