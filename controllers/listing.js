
const Listing = require ("../models/listing.js");


module.exports.index =  async (req,res) => {

    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
};

module.exports.new = (req,res) => {
    res.render("./listings/new.ejs");
};

module.exports.post = async (req,res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename};
    await newListing.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
};


module.exports.show =  async (req,res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({path :"reviews", populate : {path :"author"}})
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", {listing});
    console.log("showdone")
};

module.exports.edit = async (req,res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    let originalUrl = listing.image.url;
    listing.image.url = originalUrl.replace("/upload" , "/upload/w_250");
    res.render("./listings/edit.ejs", {listing});
    console.log("editdone")
   
};

module.exports.postEdit = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if (typeof req.fiel !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
};
