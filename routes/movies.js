const router = require('express').Router(); // инициалищируем объект роутера

const { postMovie, getMovies, deleteMovie } = require('../controllers/movies'); // импортируем контроллеры для роутера
const { postMovieValidate } = require('../middlewares/reqValidator');

router.get('/', getMovies); // настриваем запросы на роутер
router.post('/', postMovieValidate, postMovie);
router.delete('/:_id', deleteMovie);

module.exports = router; // экспортируем готовый роутер
