import { useState, useEffect } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const API_URL = "http://localhost:3000/categories";

  // Obtener categorías al cargar la página
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  // Crear una nueva categoría
  const handleCreate = async () => {
    if (!name.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const newCat = await res.json();

    setCategories([...categories, newCat]);
    setName(""); // limpiar input
  };

  return (
    <div>
      <h1>Categorías</h1>

      <input
        placeholder="Nombre de categoría"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleCreate}>Crear</button>

      <h2>Lista:</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}
