
const { getWoeid } = require('../services/weather');

module.exports = (req, res, next) => {
  getWoeid(req.body.latitude, req.body.longitude)
    .then(woeid => {
      req.woeid = woeid;
      next();
    })
    .catch(next);
};
