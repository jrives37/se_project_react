const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const getToken = () => {
  return localStorage.getItem("jwt");
};

export const getAuthHeaders = () => ({
  ...headers,
  Authorization: `Bearer ${getToken()}`,
});

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, {
    headers,
  }).then(handleServerResponse);

export const register = (name, avatar, email, password) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  }).then(handleServerResponse);

export const login = (email, password) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(handleServerResponse);

export const getCurrentUser = () =>
  fetch(`${baseUrl}/users/me`, {
    headers: getAuthHeaders(),
  }).then(handleServerResponse);

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
}

export const removeItem = (_id) => {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleServerResponse);
};

export const addCardLike = (_id) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(),
  }).then(handleServerResponse);
};

export const removeCardLike = (_id) => {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleServerResponse);
};
export const updateProfile = (name, avatar) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(handleServerResponse);
