import { useState, useEffect } from "react";
import './css/categories.css'

export default function Categories({ setCategoriesVersion }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const API_URL = "http://localhost:3000/categories";

  // Cargar categorías
  const loadCategories = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Crear nueva categoría
  const handleCreate = async () => {
    if (!name.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const newCat = await res.json();
      setCategories([...categories, newCat]);
      setName("");
      setCategoriesVersion(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  // Iniciar edición
  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  // Guardar edición
  const saveEdit = async (id) => {
    if (!editingName.trim()) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName }),
      });
      if (!res.ok) throw new Error("Error actualizando la categoría");
      const updatedCat = await res.json();
      setCategories(prev => prev.map(cat => (cat.id === id ? updatedCat : cat)));
      cancelEdit();
      setCategoriesVersion(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar categoría
  const deleteCategory = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta categoría?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando la categoría");
      setCategories(categories.filter(cat => cat.id !== id));
      setCategoriesVersion(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="categories-container">
      <h1>Categorías</h1>

      <input
        className="category-input"
        placeholder="Nombre de categoría"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button className="create-btn" onClick={handleCreate}>Crear</button>

      <h2>Lista:</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            {editingId === cat.id ? (
              <>
                <input
                  className="edit-input"
                  value={editingName}
                  onChange={e => setEditingName(e.target.value)}
                />
                <button className="save-btn" onClick={() => saveEdit(cat.id)}>Guardar</button>
                <button className="cancel-btn" onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <>
                {cat.name}
                <button className="edit-btn" onClick={() => startEdit(cat)}>Editar</button>
                <button className="delete-btn" onClick={() => deleteCategory(cat.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
