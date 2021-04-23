const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  createdAt: { type: Number },
  messages: { type: Array },
  points: {},
});

module.exports = mongoose.model('Session', SessionSchema);
