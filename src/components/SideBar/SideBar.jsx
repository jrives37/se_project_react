import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ handleEditProfileClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar">{currentUser?.name?.charAt(0)}</div>
        )}

        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <button
        className="sidebar__button"
        type="button"
        onClick={handleEditProfileClick}
      >
        Change profile data
      </button>

      <button className="sidebar__button" type="button" onClick={handleLogout}>
        Log out
      </button>
    </aside>
  );
}
