const { JWT_SECRET_TOKEN } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const { User } = require('../../models');

const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    username: 'string|empty:false',
    password: 'string|empty:false|min:6',
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate,
    });
  }

  const user = await User.findOne({
    where: { username: req.body.username },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'username not found',
    });
  }

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    });
  }

  const token = `Bearer ${jwt.sign({
    username: user.username,
  }, JWT_SECRET_TOKEN, { expiresIn: 3600 * 24 })}`;

  res.json({
    status: 'success',
    data: {
      token,
    },
  });
};
