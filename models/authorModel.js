const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data/authors.json');

function getAuthors() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveAuthors(authors) {
  fs.writeFileSync(filePath, JSON.stringify(authors, null, 2));
}

function addAuthor({ name, nationality, books = [] }) {
  const authors = getAuthors();
  const newAuthor = { id: uuidv4(), name, nationality, books };
  authors.push(newAuthor);
  saveAuthors(authors);
  return newAuthor;
}

function updateAuthor(id, updates) {
  const authors = getAuthors();
  const idx = authors.findIndex(a => a.id === id);
  if (idx === -1) return null;
  authors[idx] = { ...authors[idx], ...updates };
  saveAuthors(authors);
  return authors[idx];
}

function deleteAuthor(id) {
  const authors = getAuthors();
  const filtered = authors.filter(a => a.id !== id);
  if (filtered.length === authors.length) return false;
  saveAuthors(filtered);
  return true;
}

module.exports = {
  getAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor
};

