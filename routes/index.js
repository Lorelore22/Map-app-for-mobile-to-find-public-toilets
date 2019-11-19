const express = require("express");
const router = express.Router();
// const Point = require("../models/Point");
const User = require("../models/User");
const Toilet = require("../models/Toilet");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
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



// router.get("/api/points", (req, res, next) => {
//   Point.find()
//     .then(points => {
//       res.json(points);
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
  console.log(req.body);
  Toilet.findOneAndUpdate(req.params.toiletId)
    .then(toilet => {
      res.render("toiletForm", {
        toilet
      });
    })
});

router.post("/addToilet", loginCheck(), (req, res, next) => {
  console.log("entering post", req.body);
  const coordArr = [req.body.lat, req.body.lng]
  Toilet.create({
      coordinates: coordArr
      // user
    })
    .then(toilet => {
      // res.send(toilet)
      console.log("should redirect")
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
        toilet
      });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/updateToilet/:toiletId", loginCheck(), (req, res, next) => {
    const id = req.params.toiletId
    const {
      type,
      isFree,
      price,
      cleanliness,
      experience,
      soap,
      handDrying,
      features,
      accessibility,
      image,
      coordinates
    } = req.body

    Toilet.findByIdAndUpdate({
          _id: id
        },
        //// Destructuring  !!!!!!!!!!!!!!!!!!!!!!!!!! :)
        {
          type,
          isFree,
          price,
          cleanliness,
          experience,
          soap,
          handDrying,
          features,
          accessibility,
          image,
          coordinates
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
  }

)




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