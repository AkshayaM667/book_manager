import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
function App() {
    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ title: '', author: '', year: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchBooks = async () => {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data);
    };

    useEffect(() => { fetchBooks(); }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (editingId) {
            await axios.put(`http://localhost:5000/api/books/${editingId}`, form);
            setEditingId(null);
        } else {
            await axios.post('http://localhost:5000/api/books', form);
        }
        setForm({ title: '', author: '', year: '' });
        fetchBooks();
    };
    const handleEdit = (book) => {
        setForm(book);
        setEditingId(book._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        fetchBooks();
    };
return (
  <div className="container">
    <h2>📚 Book Manager</h2>
    <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
    <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
    <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} />
    <button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</button>

    <ul>
      {books.map(book => (
        <li key={book._id}>
          {book.title} - {book.author} ({book.year})
          <div>
            <button onClick={() => handleEdit(book)}>✏️</button>
            <button onClick={() => handleDelete(book._id)}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}
export default App;

