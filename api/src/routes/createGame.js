const { Router } = require('express');
const router = Router();
const { Videogame, Genres } = require('../db.js');

router.post('/', async(req, res) => {
    let {
        id,
        createdInDB,
        name,
        image,
        description,
        released,
        rating,
        platforms,
        genres
    } = req.body;

    const createVideogame = await Videogame.create({
        id,
        createdInDB,
        name,
        image,
        description,
        released,
        rating,
        platforms,
        genres
    });

    let genreDB = await Genres.findAll({
        where: {
            name: genres
        }
    });

    createVideogame.addGenres(genreDB);
    res.status(200).send("Videogame created successfully")
});

module.exports = router;