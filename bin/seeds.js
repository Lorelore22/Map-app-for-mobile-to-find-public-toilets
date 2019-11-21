// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Toilet = require("../models/Toilet")

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/project2-app', {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [{
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })


///////////////////////////////////////////////////////////


let toilets = [

  {

    image: null,

    coordinates: [13.36910445817577, 52.52507788092183],

    barrierFree: "✔️ Wheelchair accessible",

    changingTableMen: null,

    changingTableWomen: " ✔️ Changing table in women's room",

    cleanliness: "⭐⭐⭐⭐⭐",

    clothTowels: null,

    comment: "Not bad, but the lines were insane",

    experience: "👎",

    feminineProducts: " ✔️  Feminine hygiene products",

    genderSensitivity: null,

    handDryer: " ✔️  hand dryer",

    isFree: "No",

    location: "Berlin Hauptbahnhof",

    none: null,

    other: null,

    paperTowels: " ✔️  paper towels",

    price: 0.5,

    soap: "Yes",

    toiletType: "Train station",

    trashCan: " ✔️  Trash can"

  },

  {

    image: null,

    coordinates: [13.402151538154044, 52.496249474125136],

    barrierFree: "✔️ Wheelchair accessible",

    changingTableMen: null,

    changingTableWomen: null,

    cleanliness: "💩",

    clothTowels: null,

    comment: "Not much privacy, but great view of the river!",

    experience: "👎",

    feminineProducts: null,

    genderSensitivity: "✔️  Nonbinary options available",

    handDryer: null,

    isFree: "Yes",

    location: "somewhere in the Berlin wilderness",

    none: "❌ no drying options",

    other: null,

    paperTowels: null,

    price: null,

    soap: "No",

    toiletType: "Public",

    trashCan: " ✔️  Trash can"

  },

  {

    image: null,

    coordinates: [13.413069279549092, 52.49762165675514],

    barrierFree: "✔️ Wheelchair accessible",

    changingTableMen: null,

    changingTableWomen: " ✔️ Changing table in women's room",

    cleanliness: "💩",

    clothTowels: null,

    comment: "",

    experience: "⭐⭐⭐⭐",

    feminineProducts: " ✔️  Feminine hygiene products",

    genderSensitivity: null,

    handDryer: null,

    isFree: "No",

    location: "Viasko",

    none: null,

    other: null,

    paperTowels: " ✔️  paper towels",

    price: 0.5,

    soap: "Yes",

    toiletType: "Restaurant/cafe",

    trashCan: " ✔️  Trash can"

  },

  {

    image: null,

    coordinates: [13.397375647609692, 52.51776053483482],

    barrierFree: null,

    changingTableMen: null,

    changingTableWomen: " ✔️ Changing table in women's room",

    cleanliness: "⭐⭐⭐⭐⭐",

    clothTowels: null,

    comment:

      "A great place to anonymously slip away to the restroom, can also learn about German history before and after. ",

    experience: "⭐⭐⭐⭐",

    feminineProducts: null,

    genderSensitivity: null,

    handDryer: " ✔️  hand dryer",

    isFree: "Yes",

    location: "Deutsches Historisches Museum",

    none: null,

    other: null,

    paperTowels: " ✔️  paper towels",

    price: null,

    soap: "Yes",

    toiletType: "Museum",

    trashCan: " ✔️  Trash can"

  },

  {

    image: null,

    coordinates: [13.408482905951928, 52.52111716572199],

    barrierFree: null,

    changingTableMen: null,

    changingTableWomen: " ✔️ Changing table in women's room",

    cleanliness: "⭐⭐⭐⭐⭐",

    clothTowels: null,

    comment:

      "Beware the staff who judges you for staying so long without ordering more while you wait for your friend in the bathroom",

    experience: "👎",

    feminineProducts: null,

    genderSensitivity: null,

    handDryer: " ✔️  hand dryer",

    isFree: "No",

    location: "Cafe Alex",

    none: null,

    other: null,

    paperTowels: " ✔️  paper towels",

    price: 0.5,

    soap: "Yes",

    toiletType: "Restaurant/cafe",

    trashCan: " ✔️  Trash can"

  }

];

Toilet.deleteMany()

  .then(() => {

    return Toilet.create(toilets);

  })

  .then(toiletsCreated => {

    console.log(

      `${toiletsCreated.length} toilets created with the following id:`

    );

    console.log(toiletsCreated.map(u => u._id));

  })

  .then(() => {

    // Close properly the connection to Mongoose

    mongoose.disconnect();

  })

  .catch(err => {

    mongoose.disconnect();

    throw err;

  });