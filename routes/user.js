const express = require("express");
const asyncWrap = require("../utils/asyncWrap");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js")

router.route("/signup")
.get(asyncWrap(userController.signup))
.post(asyncWrap(userController.postSignup));

router.route("/login")
.get(asyncWrap(userController.login))
.post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect : "/login",
        failureFlash : true,
    }),
    asyncWrap(userController.postLogin));

router.get("/logout",isLoggedIn, userController.logout)

module.exports = router;