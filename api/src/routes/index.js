const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerVideoGame = require('./videogames.js');
const routerGenres = require('./genre.js');
const routerCreate = require('./createGame.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', routerVideoGame);
router.use('/genres', routerGenres);
router.use('/created', routerCreate);


module.exports = router;
