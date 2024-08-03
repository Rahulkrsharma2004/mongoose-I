const express = require("express")
const MovieModel = require('../Models/movieModel');

const MovieRouter = express.Router()



MovieRouter.get("/", async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



MovieRouter.post("/create", async (req, res) => {
    const movie = new MovieModel({
        title: req.body.title,
        rating: req.body.rating
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json({ message: "New Movie has been created", movie: newMovie });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



MovieRouter.get("/filterByTitle", async (req, res) => {
    const title = req.query.title;
    try {
        const movies = await MovieModel.find({ title: { $regex: title, $options: 'i' } });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



MovieRouter.get("/filterByRating", async (req, res) => {
    const rating = req.query.rating;
    try {
        const movies = await MovieModel.find({ rating: rating });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



MovieRouter.get("/searchByName", async (req, res) => {
    const q = req.query.q;
    try {
        const movies = await MovieModel.find({ title: { $regex: q, $options: 'i' } });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



MovieRouter.get("/sortBy", async (req, res) => {
    const sortByField = req.query.sortBy;
    try {
        const movies = await MovieModel.find().sort(sortByField);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



MovieRouter.get("/paginate", async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    try {
        const movies = await MovieModel.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = MovieRouter