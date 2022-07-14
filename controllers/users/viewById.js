const { User } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      messsage: `data user with id ${id} not found`,
    });
  }

  return res.status(200).json({
    status: 'success',
    data: user,
  });
};
