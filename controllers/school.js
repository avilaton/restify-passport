var School = require('../models/school');

function getMessages(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to server our response to any origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  School.find().limit(30).sort('Institution_Name').exec(function (arr, data) {
    res.send(data);
  });
}

function postMessage(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var School = new School();
  School.message = req.params.message;
  School.date = new Date();
  School.save(function () {
    res.send(req.body);
  });
}

module.exports = {
  get: getMessages,
  set: postMessage
};