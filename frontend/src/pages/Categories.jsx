import { useState, useEffect } from "react";
import './css/categories.css'

export default function Categories({ setCategoriesVersion }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const API_URL = "http://localhost:3000/categories";

 
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


  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };


  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };


  const saveEdit = async (id) => {
    if (!editingName.trim()) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingName }),
      });
      if (!res.ok) throw new Error("Error updating category");
      const updatedCat = await res.json();
      setCategories(prev => prev.map(cat => (cat.id === id ? updatedCat : cat)));
      cancelEdit();
      setCategoriesVersion(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Do you want to delete this category?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting category");
      setCategories(categories.filter(cat => cat.id !== id));
      setCategoriesVersion(prev => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="categories-container">
      <h1>Categories</h1>

      <input
        className="category-input"
        placeholder="Category Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button className="create-btn" onClick={handleCreate}>New</button>

      <h2>List:</h2>
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
                <button className="save-btn" onClick={() => saveEdit(cat.id)}>Save</button>
                <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {cat.name}
                <button className="edit-btn" onClick={() => startEdit(cat)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteCategory(cat.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
