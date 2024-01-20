const { Router } = require("express");
const axios = require("axios").default;
const router = Router();
const { Videogame, Genres } = require("../db.js");
const { API_KEY, BASE_URL, DB_NAME } = process.env;

//function que trae lo necesario de la api
//las primeras 5 paginas
const getApiVideoGames = async () => {
  let games = [];
  try {
    const response = await axios.get(`${BASE_URL}games?key=${API_KEY}`);
    const resultResponse = response.data.results;

    const pag1 = await axios.get(response.data.next);
    const resultPag1 = pag1.data.results;

    const pag2 = await axios.get(pag1.data.next);
    const resultPag2 = pag2.data.results;

    const pag3 = await axios.get(pag2.data.next);
    const resultPag3 = pag3.data.results;

    const pag4 = await axios.get(pag3.data.next);
    const resultPag4 = pag4.data.results;

    const allPages = [
      ...resultResponse,
      ...resultPag1,
      ...resultPag2,
      ...resultPag3,
      ...resultPag4,
    ];

    //mapeamos el resultado de esas pages
    games = await allPages.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        description: el.platforms.filter(
          (el) => el.requirements_en !== null || el.requirements_ru !== null
        ),
        released: el.released,
        rating: el.rating,
        platforms: el.platforms.map((p) => p.platform.name),
        genres: el.genres.map((g) => g.name),
      };
    });
  } catch (err) {
    games = {
      error: "Can't Fetch Video Games",
      originalError: err,
    };
  } finally {
    return games;
  }
};

//Funcion que trae lo de la DB
const getDBVideoGames = async () => {
  return await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//Funcion que concatena las dos Info API/DB
const getTotalVideoGames = async () => {
  let games = await getApiVideoGames();
  let dbInfo = await getDBVideoGames();
  let getInfoTotal = [...games, ...dbInfo];
  return getInfoTotal;
};

//Funcion Filtro por ID
//Primero preguntamos en la DB si existe o esta
const filterGames = async (id) => {
  if (isNaN(id)) {
    return await Videogame.findOne({
      where: {
        id: id,
      },
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } else {
    //Sino preguntamos en la API, si esta que retorne lo que se pide de ese ID
    const response = await axios.get(`${BASE_URL}games/${id}?key=${API_KEY}`);
    return {
      id: response.data.id,
      createdInDB: false,
      name: response.data.name,
      image: response.data.background_image,
      description: response.data.description,
      released: response.data.released,
      rating: response.data.rating,
      platforms: response.data.platforms.map((p) => p.platform.name),
      genres: response.data.genres.map((g) => g.name),
    };
  }
};

//RUTAS
router.get("/", async (req, res) => {
  let games = await getTotalVideoGames();
  const name = req.query.name;
  if (name) {
    let gamesNames = await games.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    gamesNames.length
      ? res.status(200).send(gamesNames)
      : res.status(404).send("The game you are looking for cannot be Found");
  } else {
    res.status(200).send(games);
  }
});


//localhosto3001/videogames/15
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let games = await filterGames(id);
    res.status(200).send([games]);
  } catch (err) {
    res.status(404).send("The id You looking for cannot be Found");
  }
});

//metodoAparteDelete
router.delete('/:id', async(req, res) => {
  const {
      id
  } = req.params;
  const vG = await Videogame.findOne({
      where: {
          id: id
      }
  })
  await vG.destroy();
  res.status(200).send("Video Game Deleted Successfully");
});

module.exports = router;
