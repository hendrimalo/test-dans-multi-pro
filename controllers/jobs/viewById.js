const { URL_GET_JOB_BY_ID } = process.env;
const apiAdapter = require('../../utils/axiosAdapter');

const api = apiAdapter(URL_GET_JOB_BY_ID);

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await api.get(`/${id}`);

    return res.status(200).json({
      status: 'success',
      data: job.data,
    });
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        status: 'error',
        message: 'jobs unavailable',
      });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};
