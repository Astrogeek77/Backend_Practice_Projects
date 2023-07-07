const dotenv = require('dotenv')
const express = require('express')

// DB Connection
const { connectDB } = require('./db')
connectDB()

// configs
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const bookRoutes = require('./routes/books')

app.get('/', (req, res) => {
  res.redirect('/books')
})

app.use('/', bookRoutes)

app.get('*', (req, res) => {
  res.redirect('/books')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
