import { useState, useEffect } from "react";
import { getCategories } from "../api/categoriesApi";

export default function NoteCard({ note, onEdit, onDelete, onToggleArchive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editCategoryId, setEditCategoryId] = useState(note.category?.id ?? "");

  const [categories, setCategories] = useState([]);

  // Cargar categorías al iniciar edición
  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(Array.isArray(res) ? res : res.data ?? []);
  };

  useEffect(() => {
    if (isEditing) loadCategories();
  }, [isEditing]);

  // Actualizar campos si cambia la nota
  useEffect(() => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditCategoryId(note.category?.id ?? "");
  }, [note]);

const handleSave = () => {
  onEdit(note.id, {
    title: editTitle,
    content: editContent,
    categoryId: editCategoryId ? Number(editCategoryId) : null
  });
  setIsEditing(false);
};

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "8px",
        background: note.archived ? "#f3f3f3" : "white",
      }}
    >
      {isEditing ? (
        <>
          <input
            style={{ width: "100%", marginBottom: "6px" }}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            style={{ width: "100%", marginBottom: "6px" }}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />

          <select
            style={{ width: "100%", marginBottom: "10px" }}
            value={editCategoryId}
            onChange={(e) => setEditCategoryId(e.target.value)}
          >
            <option value="">Sin categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

<p style={{ marginTop: "6px", fontStyle: "italic", color: "#555" }}>
  <strong>Categoría:</strong>{" "}
  {note.category?.name || "Sin categoría"}
</p>


          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => onToggleArchive(note.id)}>
              {note.archived ? "Desarchivar" : "Archivar"}
            </button>
            <button onClick={() => onDelete(note.id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
}
