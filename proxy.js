/*
 * @Author: legends-killer
 * @Date: 2024-07-29 21:04:54
 * @LastEditors: legends-killer
 * @LastEditTime: 2024-07-29 21:44:44
 * @Description: 
 */
const http_mod = require('http');
const ws_mod = require('ws');

// 创建 HTTP 服务器
const server = http_mod.createServer();

// 创建 WebSocket 服务器
const wss = new ws_mod.WebSocketServer({ noServer: true });

server.on("upgrade", function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
});

server.listen(9000);
console.log("WebSocket server is listening on port 9000");

// 后端 WebSocket 服务器的地址
const target = "ws://localhost:9001";

wss.on("connection", function connection(ws, request) {
  // console.log("Client connected");
  // 创建到后端 WebSocket 服务器的连接
  const backend = new ws_mod.WebSocket(target);

  backend.on("open", function open() {
    console.log("Connected to backend");
    // 当后端 WebSocket 连接打开时，将客户端的消息转发到后端
    ws.on("message", function incoming(message) {
      console.log('MSG from backend', message)
      backend.send(message);
    });

    // 将后端的消息转发到客户端
    backend.on("message", function incoming(message) {
      ws.send(message);
    });
  });

  backend.on("error", function error() {
    ws.close();
  });

  ws.on("close", function close() {
    backend.close();
  });
});
