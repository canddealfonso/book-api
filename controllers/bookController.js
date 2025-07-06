const {
    getBooks: modelGetBooks,
    addBook: modelAddBook,
    updateBook: modelUpdateBook,
    deleteBook: modelDeleteBook
  } = require('../models/bookModel');
  
  /**
   * Obtiene todos los libros
   */
  const getBooks = () => {
    try {
      const books = modelGetBooks();
      return { success: true, data: books };
    } catch (error) {
      return { success: false, message: 'Error retrieving books', error: error.message };
    }
  };
  
  /**
   * Agrega un libro
   */
  const addBook = (bookData) => {
    try {
      const newBook = modelAddBook(bookData);
      return { success: true, message: 'Book added successfully', data: newBook };
    } catch (error) {
      return { success: false, message: 'Error adding book', error: error.message };
    }
  };
  
  /**
   * Actualiza un libro
   */
  const updateBook = (id, updatedBook) => {
    try {
      const result = modelUpdateBook(id, updatedBook);
      if (result) {
        return { success: true, message: 'Book updated successfully', data: result };
      } else {
        return { success: false, message: 'Book not found' };
      }
    } catch (error) {
      return { success: false, message: 'Error updating book', error: error.message };
    }
  };
  
  /**
   * Elimina un libro
   */
  const deleteBook = (id) => {
    try {
      const result = modelDeleteBook(id);
      if (result) {
        return { success: true, message: 'Book deleted successfully' };
      } else {
        return { success: false, message: 'Book not found' };
      }
    } catch (error) {
      return { success: false, message: 'Error deleting book', error: error.message };
    }
  };
  
  /**
   * Busca libros por título (partial, case-insensitive)
   */
  const searchBookByTitle = (title) => {
    try {
      const books = modelGetBooks();
      const foundBooks = books.filter(b =>
        b.title.toLowerCase().includes(title.toLowerCase())
      );
      return { success: true, data: foundBooks };
    } catch (error) {
      return { success: false, message: 'Error searching books by title', error: error.message };
    }
  };
  
  /**
   * Busca libros por autor (partial, case-insensitive)
   */
  const searchBookByAuthor = (author) => {
    try {
      const books = modelGetBooks();
      const foundBooks = books.filter(b =>
        b.author.toLowerCase().includes(author.toLowerCase())
      );
      return { success: true, data: foundBooks };
    } catch (error) {
      return { success: false, message: 'Error searching books by author', error: error.message };
    }
  };
  
  /**
   * Busca libros por género (exact match, case-insensitive)
   */
  const searchBookByGenre = (genre) => {
    try {
      const books = modelGetBooks();
      const foundBooks = books.filter(b =>
        b.genre.toLowerCase() === genre.toLowerCase()
      );
      return { success: true, data: foundBooks };
    } catch (error) {
      return { success: false, message: 'Error searching books by genre', error: error.message };
    }
  };
  
  module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    searchBookByTitle,
    searchBookByAuthor,
    searchBookByGenre
  };