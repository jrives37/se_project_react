import "./Header.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import logo from "../../assets/logo.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleRegisterClick,

  loggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
        <p className="header__date-and-location">
          {currentDate},{weatherData.city}
        </p>
      </NavLink>

      <div className="header__actions">
        <ToggleSwitch />

        {!loggedIn && (
          <>
            <button
              className="sign"
              type="button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button className="log" type="button" onClick={handleLoginClick}>
              Log In
            </button>
          </>
        )}
      </div>

      {loggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          +Add Clothes
        </button>
      )}
      {loggedIn && (
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">{currentUser?.name}</p>

            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar">
                {currentUser?.name?.charAt(0)}
              </div>
            )}
          </div>
        </NavLink>
      )}
    </header>
  );
}

export default Header;
