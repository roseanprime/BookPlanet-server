/* Middleware */
const router = require("express").Router();

/* Require the models */
const User = require("../models/User.model");
const Book = require("../models/Book.model");
const Recommendations = require("../models/Recommendations.model");

/* REQUIRE CONFIG TO CHANGE PICTURE */
const fileUploader = require("../config/cloudinary.config");

/* Middleware */
const isLoggedIn = require("../middleware/isLoggedIn");

/* User profile */
router.get("/profile", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser._id;
  User.findById(user)
    .then((currentUser) => {
      req.session.currentUser = currentUser;
      res.render("user/profile");
    })
    .catch((err) => next(err));
});

/* Edit profile - get */
router.get("/:id/edit", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser._id;
  console.log(user);
  User.findById(user)
    .then((currentUser) => {
      req.app.locals.currentUser = currentUser;
      res.render("user/edit-profile");
    })
    .catch((err) => next(err));
});

/* Edit profile - post */
router.post("/:id/edit", fileUploader.single("image"), (req, res, next) => {
  const { id } = req.params;
  const { email, firstName, lastName, bio } = req.body;

  if (req.file) {
    User.findByIdAndUpdate(
      id,
      { email, firstName, lastName, bio, image: req.file.path },
      { new: true }
    )
      .then((updatedUser) => {
        req.app.locals.currentUser = updatedUser;
        req.session.currentUser = updatedUser;
        console.log(updatedUser);
        res.redirect("/profile");
      })
      .catch((err) => next(err));
  } else {
    User.findByIdAndUpdate(id, { email, firstName, lastName, bio }, { new: true })
      .then((updatedUser) => {
        req.app.locals.currentUser = updatedUser;
        req.session.currentUser = updatedUser;
        console.log(updatedUser);
        res.redirect("/profile");
      })
      .catch((err) => next(err));
  }
});

/* DELETE PROFILE */
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  req.app.locals.currentUser = null;
  req.session.destroy();
  User.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch((err) => next(err));
});

/* Exports */
module.exports = router;
