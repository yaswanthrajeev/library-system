import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import axios from "axios";
import "./style.css";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8800/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllBooks(); // Fetch books when the component mounts
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Books books={books} fetchAllBooks={fetchAllBooks} />}
          />
          <Route
            path="/add"
            element={<Add fetchAllBooks={fetchAllBooks} />}
          />
          <Route path="/update/:id"  element={<Update books={books} fetchAllBooks={fetchAllBooks} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
