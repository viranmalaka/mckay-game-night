const express = require('express');
const router = express.Router();
const Session = require('./models/Session');

const {to, unSuccessResponse, successResponse, authMiddleware} = require('./utils/server-utils');

router.post('/session', authMiddleware, async (req, res, next) => {
  if (!req.user || req.user.isAdmin !== true) {
    return unSuccessResponse(res, {msg: 'Permission Denied'});
  }
  const session = new Session({id: req.body.id, createdAt: Date.now(), messages: [], points: {}});
  const [err, newSession] = await to(session.save());

  if (err) {
    return unSuccessResponse(res, {err, msg: 'Something went wrong'});
  }
  return successResponse(res, {newSession});
});

router.get('/session', authMiddleware, async (req, res, next) => {
  if (!req.user || req.user.isAdmin !== true) {
    return unSuccessResponse(res, {msg: 'Permission Denied'});
  }
  const [err, data] = await to(Session.find({}, 'id createdAt', {sort: {createdAt: -1}}));
  if (err) {
    return unSuccessResponse(res, {err, msg: 'Something went wrong'});
  }
  return successResponse(res, {sessions: data});
})

router.get('/session/:_id', authMiddleware, async (req, res, next) => {
  if (!req.user) {
    return unSuccessResponse(res, {msg: 'Permission Denied'});
  }

  let [err, data] = await to(Session.findOne({id: req.params._id}));
  if (err) {
    return unSuccessResponse(res, {err, msg: 'Something went wrong'});
  }
  if(data) {
    return successResponse(res, {session: data});
  }

  [err, data] = await to(Session.findById(req.params._id));
  if (err) {
    return unSuccessResponse(res, {err, msg: 'Something went wrong'});
  }
  return successResponse(res, {session: data});
})

module.exports = router;
