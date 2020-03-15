//SETUP
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const methodOverride = require("method-override")
const User = require("./models/user");
const seedDB = require("./seed.js")

const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

mongoose.connect("mongodb+srv://admin:hoanglong@cluster0-cffun.azure.mongodb.net/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => console.log("Connected"))
    .catch(err => console.log(err));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PARTPORT CONFIGURATION
app.use(require("express-session")({
    secret: "LouisNguyen",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// This is like a middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || 5000, process.env.IP, () => {
    console.log("Server is running at port 5000");
})