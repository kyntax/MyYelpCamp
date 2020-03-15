const express       = require("express");
const router        = express.Router();
const passport      = require("passport");
const User          = require("../models/user");

//Root route
router.get("/", (req, res) => {
    res.render("landing");
});

//Authentical route
router.get("/register", (req, res) => {
    res.render("register");
});
router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err.message);
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to yelpcamp, " + user.username);
            res.redirect("/campgrounds")
        })

    })
})

router.get("/login", (req, res) => {
    res.render("login");
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (res, req) => {
    
})

router.get("/logout", (req,res)=>{
    req.logout();
    req.flash("success", "Logged you out")
    res.redirect("/campgrounds")
})

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;