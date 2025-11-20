import { useEffect, useState } from "react";
import {
  getArchivedNotes,
  deleteNote,
  toggleArchive,
  updateNote
} from "../api/notesApi";
import { getCategories } from "../api/categoriesApi";
import NoteCard from "../components/NoteCard";

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

  const filteredNotes =
    filterCategoryId === "all"
      ? notes
      : notes.filter(n => n.category?.id === Number(filterCategoryId));

  return (
    <div>
      <h2>Archivadas</h2>

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
