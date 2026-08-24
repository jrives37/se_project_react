import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sideBar__user-container">
        <p className="sideBar__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="sidebare__avatar" />
      </div>
    </aside>
  );
}
