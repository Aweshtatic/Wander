const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listing.js")
const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })






router.route("/")
    .get(asyncWrap(listingController.index))
    .post(isLoggedIn,  upload.single('listing[image]'), validateListing, asyncWrap(listingController.post));


//new Route
router.get("/new", isLoggedIn, listingController.new);

//show Route
router.route("/:id")
    .get(asyncWrap(listingController.show))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, asyncWrap(listingController.postEdit));

router.get("/:id/edit", isLoggedIn, asyncWrap(listingController.edit));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, asyncWrap(listingController.delete));

module.exports = router;