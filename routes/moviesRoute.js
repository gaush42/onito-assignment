const express = require('express')
const router = express.Router()
const {
    getlongestDurationMovie,
    postNewMovies,
    getTopRatedMovies
} = require('../controllers/moviesController')

router.get('/longest-duration-movies', getlongestDurationMovie)
router.post('/new-movie', postNewMovies)
router.get('/top-rated-movies', getTopRatedMovies)

module.exports = router;