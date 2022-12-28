const express = require('express')
const bodyParser = require('body-parser')

const db = require('./config/dbConfig')
const Router = require('./routes/moviesRoute')

const app = express()
app.use(bodyParser.json())

db.dbConnection.authenticate().then(() => {
    console.log('database connected')
}).catch((error) => {
    console.error('unable to connect ', error)
})

app.use('/api/v1',Router)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server Running at PORT ${PORT}`)
})