const jwt = require('jsonwebtoken');

module.exports = {
  to: (promise) => promise.then(result => [null, result]).catch(error => [error, null]),
  successResponse: (res, data) => res.status(200).jsonp(data),
  unSuccessResponse: (res, error) => res.status(400).jsonp({ error: error.message || error, code: 400 }),

  authMiddleware: (req, res, next) => {
    const token = req.get('token');
    if (token) {
      jwt.verify(token, process.env.JWT_SECREAT, (err, decode) => {
        if (err) {
          req.user = null;
          req.isLoggedIn = false;
          return next();
        } else {
          req.user = decode;
          req.isLoggedIn = true;
          return next();
        }
      });
    } else {
      req.user = null;
      req.isLoggedIn = false;
      return next();
    }
  }
};
