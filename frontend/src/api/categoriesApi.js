const API = "http://localhost:3000/categories";

export const getCategories = () =>
  fetch(API).then((res) => res.json());

export const createCategory = (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const updateCategory = (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteCategory = (id) =>
  fetch(`${API}/${id}`, {
    method: "DELETE"
  }).then(res => res.json());
