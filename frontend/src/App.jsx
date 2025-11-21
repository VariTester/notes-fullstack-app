import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Notes from "./pages/Notes";
import Archived from "./pages/Archived";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>My Notes App</h1>

        {/* Navegación */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/notes" style={{ marginRight: "10px" }}>Active Notes</Link>
          <Link to="/archived" style={{ marginRight: "10px" }}>Archived</Link>
          <Link to="/categories">Categories</Link>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/archived" element={<Archived />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
