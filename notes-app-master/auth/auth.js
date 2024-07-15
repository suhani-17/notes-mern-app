const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).send({ error: 'UnAuthorized!, No token found' });
    }
  
    try {
      const decoded_token = jwt.verify(token, process.env.SECRET);
      req.user = decoded_token;
      next();
    } catch (error) {
      res.status(400).send({ error: 'Invalid token' });
    }
  };

  module.exports = auth;