const Listing = require ("./models/listing.js");
const Review = require ("./models/review.js");
const {listingSchema} = require("./models/Joischema.js");
const {reviewSchema} = require("./models/Joischema.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You must be logged in first");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log(res.locals.currentUser._id);
    if(!res.locals.currentUser._id.equals(listing.owner._id)){
        req.flash("error", "You dont have permission to perform this action");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAuthor = async (req,res,next) => {
    let {id} = req.params;
    let {reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!res.locals.currentUser._id.equals(review.author._id)){
        req.flash("error", "You dont have permission to perform this action");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
    let{error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError ( 400, error);
    }else{
        next();
    };
};

module.exports.validateReview = (req,res,next) => {
    let{error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError ( 400, error);
    }else{
        next();
    };
};