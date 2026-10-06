import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { login, checkToken } from "../../auth";
import "./App.css";

import { coordinates, apiKey } from "../../utils/constants";

import Header from "../Header/Header";

import Main from "../Main/Main";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  removeItem,
  register,
  getCurrentUser,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    isDay: false,
    condition: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleLogin = (email, password) => {
    login(email, password)
      .then((data) => {
        console.log("LOGIN DATA:", data);

        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);

        return getCurrentUser();
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegister = (name, avatar, email, password) => {
    register(name, avatar, email, password)
      .then(() => {
        return login(email, password);
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);

        return getCurrentUser();
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    console.log("CARD AFTER CLICK:", card);
    console.log("IS LIKED:", isLiked);
    if (isLiked) {
      removeCardLike(card._id)
        .then((updatedCard) => {
          setClothingItems((items) =>
            items.map((item) =>
              item._id === updatedCard._id ? updatedCard : item,
            ),
          );
        })
        .catch(console.error);
    } else {
      addCardLike(card._id)
        .then((updatedCard) => {
          setClothingItems((items) =>
            items.map((item) =>
              item._id === updatedCard._id ? updatedCard : item,
            ),
          );
        })
        .catch(console.error);
    }
  };

  const handleCardUpdate = (updatedCard) => {
    setSelectedCard(updatedCard);

    setClothingItems((items) =>
      items.map((item) => (item._id === updatedCard._id ? updatedCard : item)),
    );
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setLoggedIn(false);
  };
  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems((items) => [data, ...items]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (_id) => {
    removeItem(_id)
      .then(() => {
        setClothingItems((items) => items.filter((item) => item._id !== _id));

        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
        })
        .catch(console.error);
    }
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        data.reverse();
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              handleLogout={handleLogout}
              loggedIn={loggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    setClothingItems={setClothingItems}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                      handleLogout={handleLogout}
                      handleEditProfileClick={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={onAddItem}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              handleRegister={handleRegister}
              handleLoginClick={handleLoginClick}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              handleRegisterClick={handleRegisterClick}
            />

            {activeModal === "preview" && (
              <ItemModal
                isOpen={true}
                card={selectedCard}
                onClose={closeActiveModal}
                onDelete={handleDeleteItem}
              />
            )}

            <Footer />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
