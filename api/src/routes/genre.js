const { Router } = require('express');
const router = Router();
const axios = require ('axios').default;
const { BASE_URL, API_KEY } = process.env;
const { Genres } = require('../db.js');

router.get('/', async (req, res, next) => {
  try{
    const infoApiGenres = await axios.get(`${BASE_URL}genres?key=${API_KEY}`);
    const infoGenres = infoApiGenres.data.results.map(el => el.name);
    
    const createGenres = infoGenres.forEach(el =>{
      Genres.findOrCreate({
        where: {name : el}
      })
    });
    const genreFinal = await Genres.findAll();
    res.send(genreFinal)
  }catch (err){
    next(err)
  }
});


module.exports = router;

// const  getGenre =  async (_req, res) =>  {
//     const getGenres = await axios.get(`${BASE_URL}genres?key=${API_KEY}`).catch((error) => {
//       return res.status(500).send(error);
//     });
//       let genres = await getGenres.data.results.map(el => el.name );
//       console.log(genres) 
//       for(let item of genres) {
//         await Genres.create({name: item})
//       }
//     res.json(genres)
//   } 

//   router.get('/', getGenre )