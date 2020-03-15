const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let seeds = [
    {
        name: "HCMUS Campus",
        price: "20",
        imageURL: "https://source.unsplash.com/aE5x0FSr6pA",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero mollitia magni nisi harum quasi! Voluptates est, vero rerum magni numquam recusandae, distinctio facilis incidunt similique veniam itaque aspernatur repellendus! Tenetur.",
        author: {
            username: "Louis"
        }
    },
    {
        name: "USSH Campus",
        price: "20",
        imageURL: "https://source.unsplash.com/jxqsyybT9JY",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero mollitia magni nisi harum quasi! Voluptates est, vero rerum magni numquam recusandae, distinctio facilis incidunt similique veniam itaque aspernatur repellendus! Tenetur.",
        author: {
            username: "Louis"
        }
    },
    {
        name: "Marketing Campus",
        price: "20",
        imageURL: "https://source.unsplash.com/dLifkLvc5t8",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero mollitia magni nisi harum quasi! Voluptates est, vero rerum magni numquam recusandae, distinctio facilis incidunt similique veniam itaque aspernatur repellendus! Tenetur.",
        author: {
            username: "Louis"
        }
    },
    // { name: "BK Campus", imageURL: "https://source.unsplash.com/SOnbCnBKNaU" },
    // { name: "UIT Campus", imageURL: "https://source.unsplash.com/szmNG-xJ53A" },
    // { name: "HCMUTE Campus", imageURL: "https://source.unsplash.com/cXUOQWdRV4I" }
]

async function seedDB() {
    // Remove all campgrounds
    await Campground.deleteMany({})
    await Comment.deleteMany({});
    // Add a few camgrounds
    for (const seed of seeds) {
        let campground = await Campground.create(seed);
        let comment = await Comment.create({
            text: "This land is overwhelming",
            author: {
                id: mongoose.Schema.Types.ObjectId(),
                username: "Hoang Long"
            }
        });
        await campground.comments.push(comment);
        awaitcampground.save();
    }
}
module.exports = seedDB;