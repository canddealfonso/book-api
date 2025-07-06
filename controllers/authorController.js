const {
    getAuthors: modelGetAuthors,
    addAuthor: modelAddAuthor,
    updateAuthor: modelUpdateAuthor,
    deleteAuthor: modelDeleteAuthor
  } = require('../models/authorModel');
  
  /**
   * Obtiene todos los autores
   */
  const getAuthors = () => {
    try {
      const authors = modelGetAuthors();
      return { success: true, data: authors };
    } catch (error) {
      return { success: false, message: 'Error retrieving authors', error: error.message };
    }
  };
  
  /**
   * Agrega un autor
   */
  const addAuthor = (authorData) => {
    try {
      const newAuthor = modelAddAuthor(authorData);
      return { success: true, message: 'Author added successfully', data: newAuthor };
    } catch (error) {
      return { success: false, message: 'Error adding author', error: error.message };
    }
  };
  
  /**
   * Actualiza un autor
   */
  const updateAuthor = (id, updatedAuthor) => {
    try {
      const result = modelUpdateAuthor(id, updatedAuthor);
      if (result) {
        return { success: true, message: 'Author updated successfully', data: result };
      } else {
        return { success: false, message: 'Author not found' };
      }
    } catch (error) {
      return { success: false, message: 'Error updating author', error: error.message };
    }
  };
  
  /**
   * Elimina un autor
   */
  const deleteAuthor = (id) => {
    try {
      const result = modelDeleteAuthor(id);
      if (result) {
        return { success: true, message: 'Author deleted successfully' };
      } else {
        return { success: false, message: 'Author not found' };
      }
    } catch (error) {
      return { success: false, message: 'Error deleting author', error: error.message };
    }
  };
  
  /**
   * Busca autores por nombre (case-insensitive, partial match)
   */
  const searchAuthorByName = (name) => {
    try {
      const authors = modelGetAuthors();
      const foundAuthors = authors.filter(a =>
        a.name.toLowerCase().includes(name.toLowerCase())
      );
      return { success: true, data: foundAuthors };
    } catch (error) {
      return { success: false, message: 'Error searching authors by name', error: error.message };
    }
  };
  
  /**
   * Busca autores por nacionalidad exacta (case-insensitive)
   */
  const searchAuthorByNationality = (nationality) => {
    try {
      const authors = modelGetAuthors();
      const foundAuthors = authors.filter(a =>
        a.nationality.toLowerCase() === nationality.toLowerCase()
      );
      return { success: true, data: foundAuthors };
    } catch (error) {
      return { success: false, message: 'Error searching authors by nationality', error: error.message };
    }
  };
  
  module.exports = {
    getAuthors,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    searchAuthorByName,
    searchAuthorByNationality
  };