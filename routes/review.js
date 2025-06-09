const express = require("express");
const router = express.Router({mergeParams: true});
const asyncWrap = require("../utils/asyncWrap.js")
const {validateReview, isLoggedIn, isAuthor} = require("../middlewares.js");
const reviewController = require ("../controllers/review.js");


router.post("/",isLoggedIn, validateReview, asyncWrap(reviewController.post));

router.delete("/:reviewId",isAuthor, asyncWrap(reviewController.delete));


module.exports = router;