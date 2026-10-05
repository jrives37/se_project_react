import React, { useState } from "react";

function LoginModal({ isOpen, onClose, handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(email, password);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Log in</button>

      <button type="button" onClick={onClose}>
        Close
      </button>
    </form>
  );
}

export default LoginModal;
