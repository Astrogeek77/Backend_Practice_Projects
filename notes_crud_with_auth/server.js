const express = require('express')
const server = express()

const cors = require('cors')

const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/notesRoutes')
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')

// DB Connection
const { connectDB } = require('./db')
connectDB()

const PORT = process.env.PORT || 3000

server.use(express.json())
server.use(cors())

server.use('/users', userRoutes)
server.use('/notes', noteRoutes)

server.get('/', (req, res) => {
  res.send('Notes API')
})

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('Connection failed!')
  })
