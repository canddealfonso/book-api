const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data/books.json');

function getBooks() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

function addBook({ title, author, publisher, year, genre }) {
  const books = getBooks();
  const newBook = { id: uuidv4(), title, author, publisher, year, genre };
  books.push(newBook);
  saveBooks(books);
  return newBook;
}

function updateBook(id, updates) {
  const books = getBooks();
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return null;
  books[idx] = { ...books[idx], ...updates };
  saveBooks(books);
  return books[idx];
}

function deleteBook(id) {
  const books = getBooks();
  const filtered = books.filter(b => b.id !== id);
  if (filtered.length === books.length) return false;
  saveBooks(filtered);
  return true;
}

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook
};

