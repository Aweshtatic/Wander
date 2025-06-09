const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(() => {
    console.log ("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/edits");
};

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : "683fe56543a4cae1b8c7355a"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();
