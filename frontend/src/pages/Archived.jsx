import { useEffect, useState } from "react";
import {
  getArchivedNotes,
  deleteNote,
  toggleArchive,
  updateNote
} from "../api/notesApi";
import { getCategories } from "../api/categoriesApi";
import NoteCard from "../components/NoteCard";

import './css/notes.css'; // reutilizamos los estilos de notas activas

export default function Archived() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategoryId, setFilterCategoryId] = useState("all");

  const loadNotes = async () => {
    const res = await getArchivedNotes();
    setNotes(res.data);
  };

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    loadNotes();
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  const handleToggleArchive = async (id) => {
    await toggleArchive(id);
    loadNotes();
  };

  const handleEdit = async (id, data) => {
    await updateNote(id, data);
    loadNotes();
  };

  // Filtrado de notas, igual que en Notas Activas
  const filteredNotes =
    filterCategoryId === "all"
      ? notes
      : filterCategoryId === "none"
        ? notes.filter(n => !n.category)
        : notes.filter(n => n.category?.id === Number(filterCategoryId));

  return (
    <div className="notes-container">
      <h2>Notas Archivadas</h2>

      {/* Filtro */}
      <div className="filter-category">
        <label>Filtrar por categoría: </label>
        <select
          value={filterCategoryId}
          onChange={(e) => setFilterCategoryId(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="none">Sin categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Grid de notas archivadas */}
      <div className="notes-grid">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={{ ...note, category: note.category || null }}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleArchive={handleToggleArchive}
          />
        ))}
      </div>
    </div>
  );
}
