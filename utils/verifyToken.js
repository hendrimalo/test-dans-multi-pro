const { JWT_SECRET_TOKEN } = process.env;
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
    const data = jwt.verify(token, JWT_SECRET_TOKEN);
    const user = await User.findOne({ username: data.username });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({
      error: 'Not authorized to acces this resource',
    });
  }
};
