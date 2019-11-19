const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toiletSchema = new Schema({
  toiletType: {
    type: String,
    enum: ["Public", "Restaurant/cafe", "Train station", "Bus station", "Museum", "Gas station", "Bar/club", "Other"],
  },
  isFree: {
    type: String,
    enum: ["Yes", "No"],
  },
  price: {
    type: Number,
  },
  cleanliness: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5]
  },
  experience: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5]
  },
  soap: {
    type: String,
    enum: ["Yes", "No"]
  },
  handDrying: {
    type: String,
    enum: ["hand dryer", "paper towels", "cloth towels", "other", "none"]
  },
  features: {
    type: String,
    enum: ["changing table—men", "changing table—women", "feminine products", "trash can"]
  },
  accessibility: {
    type: String,
    enum: ['gender-sensitive/nonbinary', 'barrier-free']
  },
  image: {
    type: String,
    default: '/images/dragon.png'
  },
  coordinates: {
    type: Array
  },
  adder: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  // comments: [
  //   {
  //   type: Schema.Types.ObjectId,
  //   ref: "Comment"
  //   }]
})



const Toilet = mongoose.model('Toilet', toiletSchema);
module.exports = Toilet;