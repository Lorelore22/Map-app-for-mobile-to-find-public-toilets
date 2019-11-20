const express = require("express");
const router = express.Router();
// const Point = require("../models/Point");
const User = require("../models/User");
const Toilet = require("../models/Toilet");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {
    loggedIn: req.user
  });
});



const loginCheck = () => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/");
    }
  };
};


router.get('/api/toiletcoordinates', (req, res, next) => {
  Toilet.find().then(toilets => {
    res.json(toilets)
  }).catch(err => {
    next(err)
  })
})


router.get('/aboutus', (req, res, next) => {
  res.render('aboutUs.hbs', {
    loggedIn: req.user
  })
})


router.get('/donate', (req, res, next) => {
  res.render('donate.hbs', {
    loggedIn: req.user
  })
})


// router.get("/api/points", (req, res, next) => {
//   Point.find() // toilet?
//     .then(points => {
//       res.json(points); // coords
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// router.post("/api/points", loginCheck(), (req, res, next) => {
//   console.log("irgendein Schmarn", req.body);
//   Point.create({
//       coordinates: req.body.coordinates
//     })
//     .then(() => {
//       res.json();
//     })
//     .catch(err => {
//       next(err);
//     });
// });


router.get("/toiletform/:toiletId", loginCheck(), (req, res) => {
  Toilet.findById(req.params.toiletId)
    .then(toilet => {
      res.render("toiletForm", {
        toilet: toilet,
        loggedIn: req.user
      });
    })
});

router.post("/addToilet", loginCheck(), (req, res, next) => {
  console.log("entering post: userDaten???", req.body);
  const coordArr = [parseFloat(req.body.lng), parseFloat(req.body.lat)]
  Toilet.create({
      coordinates: coordArr
      // adder: req.user._id ???????????
    })
    .then(toilet => {
      // res.send(toilet)
      console.log("toilet created with coords", toilet)
      res.redirect(`/toiletform/${toilet._id}`);
    })
    .catch(err => {
      next(err);
    })

})

router.get("/toiletDetails/:toiletId", loginCheck(), (req, res, next) => {
  Toilet.findById(req.params.toiletId)
    // .populate("adder")
    .then(toilet => {
      console.log("toilet from db", toilet);
      res.render("toiletDetails", {
        toilet: toilet,
        loggedIn: req.user
      });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/updateToilet/:toiletId", loginCheck(), (req, res, next) => {
  const id = req.params.toiletId
  const {
    toiletType,
    isFree,
    price,
    cleanliness,
    experience,
    soap,

    handDryer,
    paperTowels,
    clothTowels,
    other,
    none,

    changingTableMen,
    changingTableWomen,
    feminineProducts,
    trashCan,

    genderSensitivity,
    barrierFree,

    image

  } = req.body


  Toilet.findByIdAndUpdate({
        _id: id

      },
      //// Destructuring  !!!!!!!!!!!!!!!!!!!!!!!!!! :)
      {
        toiletType,
        isFree,
        price,
        cleanliness,
        experience,
        soap,

        handDryer,
        paperTowels,
        clothTowels,
        other,
        none,

        changingTableMen,
        changingTableWomen,
        feminineProducts,
        trashCan,

        genderSensitivity,
        barrierFree,

        image,
        adder: req.user._id
      }, {
        new: true
      })
    .then((toilet) => {
      //res.send(toilet)
      res.redirect(`/toiletDetails/${toilet._id}`);
    })
    .catch(err => {
      next(err);
    })
})

router.get("/toilets", (req, res, next) => {
  Toilet.find({
      adder: req.user
    }) ///////////////////////////////////////////////////////////////
    .then(toilets => {
      res.render("myToilets.hbs", {
        toilets: toilets,
        loggedIn: req.user
      });
    })
    .catch(err => {
      next(err);
    })
})


router.get("/toilets/:toiletId", loginCheck(), (req, res, next) => {
  console.log("Test funktioniert die Route für toilets/:toiletId??");
  Toilet.findById(req.params.toiletId)
    .populate("adder")
    .then(toilet => {
      res.render("toiletDetails.hbs", {
        //layout: false,
        toilet: toilet,
        showDelete: toilet.adder._id.toString() === req.user._id.toString() || req.user.role === "admin",
        loggedIn: req.user
      })
    })
    .catch(err => {
      next(err)
    })
})

router.get("/toilets/:toiletId/delete", loginCheck(), (req, res, next) => {
  const query = {
    _id: req.params.toiletId
  };

  if (req.user.role !== "admin") {
    query.adder = req.user._id;
  }

  Toilet.deleteOne(query)
    .then(() => {
      res.redirect("/toilets")
    })
    .catch(err => {
      next(err)
    })
})

router.get("/toilets/edit/:toiletId", (req, res) => {
  Toilet.findById(req.params.toiletId)
    .then(toilet => {
      res.render("toiletEdit.hbs", {
        toilet: toilet,
        loggedIn: req.user
      });
    })
    .catch(err => {
      next(err);
    })
})

router.post("/toilets/edit/:toiletId", (req, res) => {

  const id = req.params.toiletId
  const {
    toiletType,
    isFree,
    price,
    cleanliness,
    experience,
    soap,

    handDryer,
    paperTowels,
    clothTowels,
    other,
    none,

    changingTableMen,
    changingTableWomen,
    feminineProducts,
    trashCan,

    genderSensitivity,
    barrierFree,

    image

  } = req.body

  Toilet.findByIdAndUpdate({
        _id: id
      },
      /// Destructuring
      {
        toiletType,
        isFree,
        price,
        cleanliness,
        experience,
        soap,

        handDryer,
        paperTowels,
        clothTowels,
        other,
        none,

        changingTableMen,
        changingTableWomen,
        feminineProducts,
        trashCan,

        genderSensitivity,
        barrierFree,

        image,
        adder: req.user._id

      }, {
        new: true
      })
    .then((toilet) => {
      res.redirect("/toilets/" + req.params.toiletId);
    })
    .catch(err => {
      console.log(err);
    })
})


// router.post("/toiletform/:toiletId", loginCheck(), (req, res, next) => {
//   const {
//     type,
//     isFree,
//     price,
//     cleanliness,
//     experience,
//     soap,
//     handDrying,
//     features,
//     accessibility,
//     image,
//     coordinates
//   } = req.body

//   Toilet.updateOne({
//         _id: req.params.toiletId
//       },
//       //// Destructuring  !!!!!!!!!!!!!!!!!!!!!!!!!! :)
//       {
//         type,
//         isFree,
//         price,
//         cleanliness,
//         experience,
//         soap,
//         handDrying,
//         features,
//         accessibility,
//         image,
//         coordinates
//       })
//     .then((toilet) => {
//       res.redirect(`/toiletDetails/${toilet._id}`);
//     })
//     .catch(err => {
//       next(err);
//     })
// });






module.exports = router;