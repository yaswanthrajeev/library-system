import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = ({ books, fetchAllBooks }) => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  // Fetch the book details on component mount
  useEffect(() => {
    const fetchBook = () => {
      const currentBook = books.find(b => b.id.toString() === bookId);
      if (currentBook) {
        setBook(currentBook);
      }
    };
    fetchBook();
  }, [bookId, books]);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      fetchAllBooks(); // Refresh the book list
      navigate("/"); // Redirect to homepage after successful update
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form'>
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={book.title || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="desc"
        value={book.desc || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={book.price || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cover URL"
        name="cover"
        value={book.cover || ""}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
