
const Listing = require ("../models/listing.js");
const Review = require ("../models/review.js");


module.exports.post = async(req, res) => {
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    console.log(req.user);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review created successfully!");
    res.redirect(`/listings/${listing._id}`);
}
module.exports.delete = async(req,res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate({_id: id}, {$pull : {reviews : reviewId} });

    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
};