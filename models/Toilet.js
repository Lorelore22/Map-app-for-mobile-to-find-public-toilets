const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const toiletSchema = new Schema({
  type: {
    enum: ["Public", "Restaurants and cafes", "Train station", "Bus station", "Museum", "Gas station", "Bar and clubs", "Other"],
    required: true
  },
  isFree: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    default: 0.00
  },
  cleanliness: {
    enum: [0, 1, 2, 3, 4, 5]
  },
  experience: {
    enum: [0, 1, 2, 3, 4, 5]
  },
  soap: Boolean,
  handDrying: {
    enum: ["hand dryer", "paper towels", "cloth towels", "other", "none"]
  },
  features: {
    enum: ["changing table", "feminine products", "trash can"]
  },
  accesibility: {
    enum: ['gender-sensitive/nonbinary', 'barrier-free']
  },
  image: {
    type: String,
    default: '/images/dragon.png'
  }
})



const Toilet = mongoose.model('Toilet', toiletSchema);
module.exports = Toilet;