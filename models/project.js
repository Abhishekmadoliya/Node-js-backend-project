const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required:true
    },
    budget: {
      type: Number,
      required:true
    },
    status: {
      type: String,
      enum: ['Planned', 'Ongoing', 'Completed'],
      default: 'Planned',
      required: true
    },
    associatedVolunteers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Volunteer'
    }],
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    createdDate: {
      type: Date,
      default: Date.now
    }
  });
  
  const Project = mongoose.model('Project', projectSchema);
  module.exports = Project;
  