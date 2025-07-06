const {
    getPublishers: modelGetPublishers,
    addPublisher: modelAddPublisher,
    updatePublisher: modelUpdatePublisher,
    deletePublisher: modelDeletePublisher
  } = require('../models/publisherModel');
  
  /**
   * Obtiene todas las editoriales
   */
  const getPublishers = () => {
    try {
      const publishers = modelGetPublishers();
      return { success: true, data: publishers };
    } catch (error) {
      return { success: false, message: 'Error retrieving publishers', error: error.message };
    }
  };
  
  /**
   * Agrega una editorial
   */
  const addPublisher = (publisherData) => {
    try {
      const newPublisher = modelAddPublisher(publisherData);
      return { success: true, message: 'Publisher added successfully', data: newPublisher };
    } catch (error) {
      return { success: false, message: 'Error adding publisher', error: error.message };
    }
  };
  
  /**
   * Actualiza una editorial
   */
  const updatePublisher = (id, updatedPublisher) => {
    try {
      const result = modelUpdatePublisher(id, updatedPublisher);
      if (result) {
        return { success: true, message: 'Publisher updated successfully', data: result };
      } else {
        return { success: false, message: 'Publisher not found' };
      }
    } catch (error) {
      return { success: false, message: 'Error updating publisher', error: error.message };
    }
  };
  
  /**
   * Elimina una editorial
   */
  const deletePublisher = (id) => {
    try {
      const result = modelDeletePublisher(id);
      if (result) {
        return { success: true, message: 'Publisher deleted successfully' };
      } else {
        return { success: false, message: 'Publisher not found' };
      }
    } catch (error) {
      return { success: false, message: 'Error deleting publisher', error: error.message };
    }
  };
  
  module.exports = {
    getPublishers,
    addPublisher,
    updatePublisher,
    deletePublisher
  };
  