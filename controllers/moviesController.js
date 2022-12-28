const Sequelize = require('sequelize')
const db = require('../config/dbConfig')

const getlongestDurationMovie = async(req,res) => {
    try{
      const movies =  await db.dbConnection.query(`SELECT tconst, primaryTitle, runtimeMinutes, genres FROM movies ORDER BY runtimeMinutes DESC LIMIT 10`, { type: Sequelize.QueryTypes.SELECT })
      res.send(movies)
    }catch (error) {
      console.error('Cannot get Movies', error)
    }
}

const postNewMovies = async(req, res) => {
  try{
      const {
        titleType,
        primaryTitle,
        runtimeMinutes,
        genres
      } = req.body

      if(!titleType || !primaryTitle || !runtimeMinutes || !genres){
        return res.status(400).send('all fields are required')
      }

      const tconst = 'tt' + String(Math.floor(Math.random() * 900 + 1000000))

      await db.dbConnection.query(`INSERT INTO movies(tconst, titleType, primaryTitle, runtimeMinutes, genres) VALUES ('${tconst}' , '${titleType}', '${primaryTitle}', '${runtimeMinutes}', '${genres}')`)
      res.status(200).send('Success')

  }catch(error){
    console.error('Cannot Post New Movies', error)
  }
}
const getTopRatedMovies = async(req,res) => {
  try{
    const topmovies =  await db.dbConnection.query(`SELECT movies.tconst, primaryTitle, genres , averageRating FROM movies INNER JOIN ratings ON movies.tconst=ratings.tconst WHERE averageRating > 6 ORDER BY averageRating DESC`, { type: Sequelize.QueryTypes.SELECT })
    res.send(topmovies)
  }catch (error) {
    console.error('Cannot get top Movies', error)
  }
}


module.exports = {
    getlongestDurationMovie,
    postNewMovies,
    getTopRatedMovies
}