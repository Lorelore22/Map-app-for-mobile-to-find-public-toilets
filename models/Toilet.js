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
    type: String
  },
  experience: {
    type: String
  },
  soap: {
    type: String,

  },



  handDryer: String,
  paperTowels: String,
  clothTowels: String,
  other: String,
  none: String,

  changingTableMen: String,
  changingTableWomen: String,
  feminineProducts: String,
  trashCan: String,

  genderSensitivity: String,
  barrierFree: String,

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

  comment: String,
  location: String,
  // comments: [
  //   {
  //   type: Schema.Types.ObjectId,
  //   ref: "Comment"
  //   }]
})



const Toilet = mongoose.model('Toilet', toiletSchema);
module.exports = Toilet;