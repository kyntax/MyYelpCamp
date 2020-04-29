const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware")
// INDEX route - Display campground
router.get("/", (req, res) => {
    // Get campgrounds from DB, if found => render to the website
    try{
        let allCampgrounds = await Campground.find({});
        res.render("campgrounds/index", {
            campgrounds: allCampgrounds,
        });
    } catch(errs){
        res.status(422).json({ errors: errs })
    }
});

// CREAT route - Add new campgrounds
router.post("/", middleware.isLoggedIn, (req, res) => {
    //Get data form current user
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = req.body.campground;
    newCampground.author = author;
    // Create a new camground and save to DB
    Campground.create(newCampground)
        .then(() => {
            res.redirect("/campgrounds");
        })
        .catch(err => { console.log(err); });

});
// NEW route - Show form for new campground entry
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW route - Show a specified blog 
router.get("/:id", (req, res) => {
    // find Campgrounds with provided ID
    Campground.findById(req.params.id).populate("comments").exec(
        (err, foundCampground) => {
            if (err || !foundCampground) {
                req.flash("error", "Campground not found");
                res.redirect("back")
            } else {
                // render SHOW template
                res.render("campgrounds/show", {
                    campground: foundCampground,
                });
            }
        }
    )

});
// EDIT - Campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campground: foundCampground });
    });

});
// Update - Campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // Find and update the campground
    Campground.findOneAndUpdate({ _id: req.params.id }, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE - Campground route
router.delete("/:id",middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err) => {
        res.redirect("/campgrounds");checkCampgroundOwnerShip
    })
});

module.exports = router;