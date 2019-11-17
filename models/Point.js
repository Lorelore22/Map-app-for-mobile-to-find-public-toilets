const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pointSchema = new Schema({
    coordinates: [Number]
})


const Point = mongoose.model("Point", pointSchema);


module.exports = Point;