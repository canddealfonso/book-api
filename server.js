const net = require('net');
const authorCtrl    = require('./controllers/authorController');
const bookCtrl      = require('./controllers/bookController');
const publisherCtrl = require('./controllers/publisherController');

const PORT = 8080;

const server = net.createServer(socket => {
  console.log('Cliente conectado');
  socket.setEncoding('utf8');

  let buffer = '';
  socket.on('data', data => {
    buffer += data;
    while (buffer.includes('\n')) {
      const [raw, ...rest] = buffer.split('\n');
      buffer = rest.join('\n');
      const line = raw.trim();
      let responseObj;

      try {
        const [cmd, restLine = ''] = line.split(' ', 2);

        switch (cmd.toUpperCase()) {

          case 'HELP':
            responseObj = {
              success: true,
              commands: [
                'HELP',
                'GET AUTHORS',
                'GET BOOKS',
                'GET PUBLISHERS',
                'ADD AUTHOR|<name>|<nationality>',
                'ADD BOOK|<title>|<author>|<publisher>|<year>|<genre>',
                'ADD PUBLISHER|<name>|<country>',
                'UPDATE AUTHOR|<id>|<name>|<nationality>',
                'UPDATE BOOK|<id>|<title>|<author>|<publisher>|<year>|<genre>',
                'UPDATE PUBLISHER|<id>|<name>|<country>',
                'DELETE AUTHOR|<id>',
                'DELETE BOOK|<id>',
                'DELETE PUBLISHER|<id>'
              ]
            };
            break;

          case 'GET':
            switch (restLine.toUpperCase()) {
              case 'AUTHORS':
                responseObj = authorCtrl.getAuthors();
                break;
              case 'BOOKS':
                responseObj = bookCtrl.getBooks();
                break;
              case 'PUBLISHERS':
                responseObj = publisherCtrl.getPublishers();
                break;
              default:
                responseObj = { success: false, message: 'USO: GET AUTHORS | GET BOOKS | GET PUBLISHERS' };
            }
            break;

          case 'ADD': {
            const [entity, ...fields] = restLine.split('|');
            switch (entity.toUpperCase()) {
              case 'AUTHOR': {
                const [name, nationality] = fields;
                responseObj = authorCtrl.addAuthor({ name, nationality });
                break;
              }
              case 'BOOK': {
                const [title, author, publisher, year, genre] = fields;
                responseObj = bookCtrl.addBook({ title, author, publisher, year, genre });
                break;
              }
              case 'PUBLISHER': {
                const [name, country] = fields;
                responseObj = publisherCtrl.addPublisher({ name, country });
                break;
              }
              default:
                responseObj = { success: false, message: 'USO: ADD AUTHOR|… | ADD BOOK|… | ADD PUBLISHER|…' };
            }
            break;
          }

          case 'UPDATE': {
            const [entity, id, ...updates] = restLine.split('|');
            let data = {};
            switch (entity.toUpperCase()) {
              case 'AUTHOR': {
                const [name, nationality] = updates;
                data = { name, nationality };
                responseObj = authorCtrl.updateAuthor(id, data);
                break;
              }
              case 'BOOK': {
                const [title, author, publisher, year, genre] = updates;
                data = { title, author, publisher, year, genre };
                responseObj = bookCtrl.updateBook(id, data);
                break;
              }
              case 'PUBLISHER': {
                const [name, country] = updates;
                data = { name, country };
                responseObj = publisherCtrl.updatePublisher(id, data);
                break;
              }
              default:
                responseObj = { success: false, message: 'USO: UPDATE ENTITY|id|…' };
            }
            break;
          }

          case 'DELETE': {
            const [entity, id] = restLine.split('|');
            switch (entity.toUpperCase()) {
              case 'AUTHOR':
                responseObj = authorCtrl.deleteAuthor(id);
                break;
              case 'BOOK':
                responseObj = bookCtrl.deleteBook(id);
                break;
              case 'PUBLISHER':
                responseObj = publisherCtrl.deletePublisher(id);
                break;
              default:
                responseObj = { success: false, message: 'USO: DELETE ENTITY|id' };
            }
            break;
          }

          default:
            responseObj = { success: false, message: 'Comando desconocido. Usa GET, ADD, UPDATE o DELETE.' };
        }
      } catch (err) {
        responseObj = { success: false, message: err.message };
      }

      socket.write(JSON.stringify(responseObj) + '\n');
    }
  });

  socket.on('end', () => console.log('Cliente desconectado'));
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
