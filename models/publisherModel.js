const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data/publishers.json');

function getPublishers() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return [];
  }
}

function savePublishers(list) {
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
}

function addPublisher({ name, country, books = [] }) {
  const list = getPublishers();
  const newPub = { id: uuidv4(), name, country, books };
  list.push(newPub);
  savePublishers(list);
  return newPub;
}

function getPublisherById(id) {
  return getPublishers().find(p => p.id === id) || null;
}

function updatePublisher(id, updates) {
  const list = getPublishers();
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  savePublishers(list);
  return list[idx];
}

function deletePublisher(id) {
  const list = getPublishers();
  const filtered = list.filter(p => p.id !== id);
  if (filtered.length === list.length) return false;
  savePublishers(filtered);
  return true;
}

module.exports = {
  getPublishers,
  getPublisherById,
  addPublisher,
  updatePublisher,
  deletePublisher
};
