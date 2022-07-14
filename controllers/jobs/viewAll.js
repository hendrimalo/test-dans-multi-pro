const { URL_GET_JOB } = process.env;
const apiAdapter = require('../../utils/axiosAdapter');

const api = apiAdapter(URL_GET_JOB);

module.exports = async (req, res) => {
  try {
    const {
      page, description, location, full_time,
    } = req.query;

    const job = await api.get('/', {
      params: {
        page,
        description,
        location,
        full_time,
      },
    });

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
