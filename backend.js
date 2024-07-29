const http = require('http');
const ws_mod = require('ws');

// Create an HTTP server
const server = http.createServer();

// Create a WebSocket server
const wss = new ws_mod.WebSocketServer({ noServer: true });

// Handle upgrade requests to upgrade HTTP to WebSocket
server.on('upgrade', function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

// Listen on port 9001
server.listen(9001, function() {
  console.log('Server is listening on port 9001');
});

wss.on('connection', function connection(ws, request) {
  console.log('Client connected');
  const backend = new ws_mod.WebSocket('ws://localhost:9000');

  backend.on('open', function open() {
    ws.on('message', function incoming(message) {
      backend.send(message);
    });

    backend.on('message', function incoming(message) {
      ws.send(message);
    });
  });

  backend.on('error', function error() {
    ws.close();
  });

  ws.on('close', function close() {
    backend.close();
  });
});