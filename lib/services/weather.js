const superagent = require('superagent');

const getWeather = () => {
  return superagent
    .get(`https://www.metaweather.com/api/location/${woeid}/`)
    .then(res => {
      const [{ weather }] = res.body;
      return weather;
    });
};

const getWoeid = (city) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?query=${city}`)
    .then(res => {
      const [{ woeid }] = res.body;
      return woeid;
    });
};


module.exports = {
  getWeather,
  getWoeid
};
