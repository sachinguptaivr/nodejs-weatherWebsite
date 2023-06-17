const request = require("request");
const geoCode = (addr, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=46df7cb63df98c3a91c730ce5504696c&query=${addr}&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    //console.log(response.body);
    if (error) {
      callback("unable to contact position API!");
    } else if (response.body.error || response.body.data == "") {
      callback("location not exist");
    } else {
      const positionStack = response.body.data;
      const { latitude, longitude, name } = positionStack[0];
      callback(undefined, {
        latitude,
        longitude,
        name,

        // latitude: positionStack[0].latitude,
        // longitude: positionStack[0].longitude,
        // location: positionStack[0].name,
      });
    }
  });
};

module.exports = geoCode;
