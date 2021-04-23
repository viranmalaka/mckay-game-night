const Session = require('./models/Session');

const clients = {};
let adminId = null;

const notifyAdminOnClientChange = () => {
  const allClients = Object.values(clients);
  allClients
    .filter(({ user }) => user.isAdmin)
    .forEach(({ socket }) => {
      socket.send(JSON.stringify({ type: 'user_changed', payload: allClients.map(({ user }) => user) }));
    });
};

module.exports = (wss) => {
  // socket.io events
  wss.on('connection', function (ws) {
    console.log('connected');
    ws.on('close', () => {
      console.log('close');
      delete clients[ws.user_id];
      notifyAdminOnClientChange();
    });

    ws.on('message', (data) => {
      try {
        const { type, payload } = JSON.parse(data);
        switch (type) {
          case 'set_user':
            ws['user_id'] = payload._id;
            clients[payload._id] = { socket: ws, user: payload };
            notifyAdminOnClientChange();
            break;

          case 'user_message':
            payload.time = Date.now();
            const isAdminMessage = clients[ws.user_id].user && clients[ws.user_id].user.isAdmin;
            Object.values(clients).forEach(({ socket, user }) => {
              if (isAdminMessage) {
                // send all
                socket.send(JSON.stringify({ type: 'user_message', payload }));
              } else {
                if (user.isAdmin || user.username === payload.username) {
                  // send only to the admin
                  socket.send(JSON.stringify({ type: 'user_message', payload }));
                }
              }
            });
            // save in the db
            const { sessionId, ...rest } = payload;
            console.log({ sessionId, rest });
            Session.findOneAndUpdate({ id: sessionId }, { $push: { messages: rest } }, { new: true }).then(console.log);
            break;

          case 'update_points':
            console.log('upd pt', payload);
            const { sessionId: sid, points } = payload;

            Object.values(clients).forEach(({ socket }) => {
              socket.send(JSON.stringify({ type: 'changed_points', payload: points }));
            });
            // save in the db
            Session.findOneAndUpdate({ id: sid }, { points }, { new: true }).then(console.log);
            break;
        }
      } catch (e) {
        console.log('Invalid message', e, data);
      }
    });
  });
};

module.exports.supervisorSockets = clients;
