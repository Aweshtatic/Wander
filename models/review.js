const { required } = require("joi");
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
   comment: String,
   createdAt:{
    type: Date,
    default: Date.now(),
   },
   rating:{
    type: Number,
    min:0,
    max:5,
   },
   author : {
      type : Schema.Types.ObjectId,
      ref : "User",
   }
})
 const Review = mongoose.model("Review", reviewSchema);

 module.exports = Review;
