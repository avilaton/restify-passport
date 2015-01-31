var mongoose = require('mongoose/');
var config = require('./config');
db = mongoose.connect(config.creds.mongoose_auth_local),

SchoolSchema = require('./models/school');

// Use the schema to register a model with MongoDb
mongoose.model('School', SchoolSchema);

var School = mongoose.model('School');

var schools = require('./data/schools');

School.create(schools, function (err) {
  if (err) {
    console.log("something went wrong inserting schools");
  };
});
