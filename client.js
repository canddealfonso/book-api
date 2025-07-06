const net      = require('net');
const readline = require('readline');

const HOST = '127.0.0.1';
const PORT = 8080;

function connectToServer() {
  const client = net.createConnection({ host: HOST, port: PORT }, () => {
    console.log(`✅ Conectado a ${HOST}:${PORT}`);
    prompt();
  });

  let buffer = '';
  client.setEncoding('utf8');

  client.on('data', data => {
    buffer += data;
    while (buffer.includes('\n')) {
      const [ line, ...rest ] = buffer.split('\n');
      buffer = rest.join('\n');
      try {
        const json = JSON.parse(line);
        console.log('←', JSON.stringify(json, null, 2));
      } catch {
        console.log('←', line);
      }
    }
  });

  client.on('end', () => {
    console.log('🔌 Desconectado del servidor');
    process.exit(0);
  });

  client.on('error', err => {
    console.error('❌ Error de conexión:', err.message);
    setTimeout(connectToServer, 3000);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function prompt() {
    rl.question('> ', input => {
      if (input.trim().toLowerCase() === 'exit') {
        client.end();
        rl.close();
      } else {
        client.write(input.trim() + '\n');
        prompt();
      }
    });
  }
}

connectToServer();
