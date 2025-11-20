// NoteCard.jsx
import { useState, useEffect } from "react";
import { getCategories } from "../api/categoriesApi";

import "./css/noteCard.css";

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
      categoryId: editCategoryId ? Number(editCategoryId) : null,
    });
    setIsEditing(false);
  };

  return (
<div className={`note-card ${note.archived ? 'archived' : ''} ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <>
          <input
            className="input-edit"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="textarea-edit"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <select
            className="select-edit"
            value={editCategoryId}
            onChange={(e) => setEditCategoryId(e.target.value)}
          >
            <option value="">Sin categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="note-actions">
            <button className="button-save" onClick={handleSave}>Guardar</button>
            <button className="button-cancel" onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <h3 className="note-title">{note.title}</h3>
          <p className="note-content">{note.content}</p>
          <div className="note-card-category">
          {note.category ? (
            <span className="category-badge">{note.category.name}</span>
          ) : (
            <span className="category-badge no-category">Sin categoría</span>
          )}
        </div>

          <div className="note-actions">
            <button className="button-edit" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="button-archive" onClick={() => onToggleArchive(note.id)}>
              {note.archived ? "Desarchivar" : "Archivar"}
            </button>
            <button className="button-delete" onClick={() => onDelete(note.id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
}
