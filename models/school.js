var mongoose = require('mongoose/'),
  Schema = mongoose.Schema;

var SchoolSchema = new Schema({
  Institution_ID: Number,
  Institution_Name: String,
  Institution_Address: String,
  Institution_City: String,
  Institution_State: String,
  Institution_Zip: String,
  Institution_Phone: String,
  Institution_OPEID: String,
  Institution_IPEDS_UnitID: String,
  Institution_Web_Address: String,
  Campus_ID: String,
  Campus_Name: String,
  Campus_Address: String,
  Campus_City: String,
  Campus_State: String,
  Campus_Zip: String,
  Campus_IPEDS_UnitID: String,
  Accreditation_Type: String,
  Agency_Name: String,
  Program_Name: String,
  Review_Date: String,
  Accreditation_Status: String,
  Accreditation_Date_Type: String,
  Periods: String,
  Last_Action: String
});

module.exports = mongoose.model('School', SchoolSchema);