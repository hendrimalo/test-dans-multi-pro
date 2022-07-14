const Validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const v = new Validator();
module.exports = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `data user with id ${id} not found`,
    });
  }

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

  const { username } = req.body;
  if (username) {
    const checkQuote = await User.findOne({
      where: { username },
    });

    if (checkQuote && username !== user.username) {
      return res.status(409).json({
        status: 'error',
        message: 'username already exist',
      });
    }
  }

  const editedUser = await user.update({
    username,
    password: await bcrypt.hash(req.body.password, 10),
  });

  return res.status(200).json({
    status: 'success',
    message: `${editedUser.username} success edited`,
  });
};
