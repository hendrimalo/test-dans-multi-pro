const { User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const user = await User.findAll({ attributes: ['id', 'username'] });

    if (user.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'data user not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
