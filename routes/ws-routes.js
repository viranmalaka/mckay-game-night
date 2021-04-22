const clients = {};

module.exports = (wss) => {
  // socket.io events
  wss.on('connection', function (ws) {
    console.log('connected');
    ws.on('close', () => {
      console.log('close');
      delete clients[ws.id];
    });

    ws.on('message', (data) => {
      console.log(data);
    });
  });
};

module.exports.supervisorSockets = clients;
