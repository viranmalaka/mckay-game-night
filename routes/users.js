const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { to, unSuccessResponse, successResponse, authMiddleware } = require('./utils/server-utils');
const User = require('./models/User');

router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  const [err, user] = await to(User.findOne({ username }));
  if (err) {
    return unSuccessResponse(res, { err });
  }

  if (user) {
    return unSuccessResponse(res, { user, msg: 'user already exist' });
  }

  const salt = await bycrypt.genSalt(10); // generate a salt
  const hash = await bycrypt.hash(password, salt); // generate the hash of the password

  const [errSave, newUser] = await to(new User({ username, password: hash }).save());
  if (errSave) {
    return unSuccessResponse(res, { err: errSave });
  }
  return successResponse(res, { newUser });
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  const [err1, user] = await to(User.findOne({ username }));
  if (err1) {
    return unSuccessResponse(res, { err: err1 });
  }

  if (!user) {
    return unSuccessResponse(res, { msg: 'user not found' });
  }

  const [err2, isMatch] = await to(bycrypt.compare(password, user.password));
  if (err2 || !isMatch) {
    return unSuccessResponse(res, { err: err2, msg: 'invalid password' });
  }

  const encryptObject = {
    username: user.username,
    isAdmin: user.isAdmin,
    _id: user._id,
  };
  jwt.sign(encryptObject, process.env.JWT_SECREAT || 'ss', { expiresIn: '14d' }, (err3, token) => {
    return successResponse(res, {
      user: encryptObject,
      token,
    });
  });
});

router.get('/validate', authMiddleware, async (req, res, next) => {
  console.log(req.isLoggedIn, req.user);
  if (req.isLoggedIn) {
    return successResponse(res, { success: true, user: req.user });
  } else {
    return unSuccessResponse(res, { success: false });
  }
});

router.get('/all-users', authMiddleware, async (req, res, next) => {
  if (!req.user || req.user.isAdmin !== true) {
    return unSuccessResponse(res, { msg: 'Permission Denied' });
  }
  const [err, users] = await to(User.find());
  if (err) {
    return unSuccessResponse(res, { err, msg: 'Something went wrong' });
  }
  return successResponse(res, { users });
});

module.exports = router;
