const { default: mongoose } = require("mongoose");


const volunteerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    
    registrationDate: {
      type: Date,
      default: Date.now
    }
  });
  
  const Volunteer = mongoose.model('Volunteer', volunteerSchema);
  module.exports = Volunteer;
  