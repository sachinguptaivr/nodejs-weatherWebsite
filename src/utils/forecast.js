const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0afaf54c21441a5f6ed720b4bad37bbf&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    //console.log(response.body);
    if (error) {
      callback("Unable to contact weather API");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      // const temp = response.body.current.temperature;
      // const rainChance = response.body.current.precip;
      const { temperature, precip } = body.current;
      callback(
        undefined,
        `It is currently ${temperature} degree out. There is a ${precip}% of rain `
      );
    }
  });
};

module.exports = forecast;
