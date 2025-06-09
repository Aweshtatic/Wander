
const User = require ("../models/user.js");

module.exports.signup = async(req,res) => {
    res.render("./users/signup.ejs");
};

module.exports.postSignup = async(req,res) => {
    try{
        let{email, username, password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) =>{
        if(err) {
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
    res.redirect("/listings");
    })} catch(e){
        req.flash("error", e.message);
        res.redirect("/signup")
    }

};

module.exports.login = async(req,res) => {
    res.render("./users/login.ejs");
};

module.exports.postLogin = async(req,res) => {
        req.flash("success", "Welcome back to Wanderlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    };

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "User has been logged out");
        res.redirect("/login")
    })
};