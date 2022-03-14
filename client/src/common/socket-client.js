class SocketClient {
  static instance;

  socket = null;
  hooks = {};

  static getInstance() {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  constructor() {}

  connect(user, cb) {
    if (this.socket) {
      return false;
    }
    // this.socket = new WebSocket('ws://' + window.location.host);
    this.socket = new WebSocket('ws://localhost:4000');

    // Connection opened
    this.socket.addEventListener('open', (event) => {
      console.log('Connected to WS Server');
      const { isAdmin, username, _id } = user;
      this.emitMessage('set_user', { isAdmin, username, _id });
      cb();
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
      try {
        const json = JSON.parse(event.data);
        if (this.hooks[json.type]) {
          this.hooks[json.type](json.payload);
        }
      } catch (e) {
        console.log('invalid data', e, event.data);
      }
    });

    this.socket.addEventListener('close', (e) => {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      this.socket = null;
      setTimeout(() => {
        this.connect(user, cb);
      }, 1000);
    });
  }

  emitMessage(type, payload) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      setTimeout(() => {
        this.emitMessage(type, payload);
      }, 500);
    } else {
      this.socket.send(JSON.stringify({ type, payload }));
    }
  }

  sendMessage(user, sessionId, message) {
    this.emitMessage('user_message', { sessionId, username: user.username, isAdmin: user.isAdmin, message });
  }

  updatePoints(sessionId, points) {
    this.emitMessage('update_points', { sessionId, points });
  }

  addHook(name, fn) {
    this.hooks[name] = fn;
  }
}

export default SocketClient;
