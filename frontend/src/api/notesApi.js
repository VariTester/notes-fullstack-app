import axios from "axios";

const API = "http://localhost:3000/notes";

// Obtener notas activas
export const getActiveNotes = (categoryId) => {
  const url = categoryId !== undefined
    ? `${API}?categoryId=${categoryId}`
    : API;

  return axios.get(url);
};

// Obtener notas archivadas
export const getArchivedNotes = (categoryId) => {
  const url = categoryId !== undefined
    ? `${API}/archived?categoryId=${categoryId}`
    : `${API}/archived`;

  return axios.get(url);
};

// Crear nota
export const createNote = (noteData) => axios.post(API, noteData);

// Editar nota
export const updateNote = (id, noteData) =>
  axios.put(`${API}/${id}`, noteData);

// Archivar / desarchivar
export const toggleArchive = (id) =>
  axios.patch(`${API}/${id}/archive`);

// Eliminar
export const deleteNote = (id) =>
  axios.delete(`${API}/${id}`);
