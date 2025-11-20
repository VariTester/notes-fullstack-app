import { useEffect, useState } from "react";
import {
  getActiveNotes,
  createNote,
  deleteNote,
  toggleArchive,
  updateNote
} from "../api/notesApi";
import { getCategories } from "../api/categoriesApi";
import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [categories, setCategories] = useState([]);
  const [newCategoryId, setNewCategoryId] = useState("");

  const [filterCategoryId, setFilterCategoryId] = useState("all");

  const loadNotes = async () => {
    const res = await getActiveNotes();
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

  const handleCreate = async () => {
    await createNote({
      title: newTitle,
      content: newContent,
      category: newCategoryId ? { id: Number(newCategoryId) } : null
    });

    setNewTitle("");
    setNewContent("");
    setNewCategoryId("");

    loadNotes();
  };

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

  // ⭐ Filtrado
  const filteredNotes =
    filterCategoryId === "all"
      ? notes
      : notes.filter(n => n.category?.id === Number(filterCategoryId));

  return (
    <div>
      <h2>Notas Activas</h2>

      {/* Filtro */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filtrar por categoría: </label>
        <select
          value={filterCategoryId}
          onChange={(e) => setFilterCategoryId(e.target.value)}
        >
          <option value="all">Todas</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Crear nota */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          placeholder="Contenido"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />

        <select
          value={newCategoryId}
          onChange={(e) => setNewCategoryId(e.target.value)}
        >
          <option value="">Sin categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button onClick={handleCreate}>Crear Nota</button>
      </div>

      {filteredNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleArchive={handleToggleArchive}
        />
      ))}
    </div>
  );
}
