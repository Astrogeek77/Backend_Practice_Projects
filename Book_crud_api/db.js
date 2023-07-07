const mongoose = require('mongoose')

function connectDB() {
  mongoose.connection
    .on('connecting', () => {
      console.log('Connecting to database...')
    })
    .on('connected', () => {
      console.log('Database connected successfully')
    })
    .on('error', (error) => {
      console.log(error)
    })
    .on('disconnected', () => {
      console.log('Database disconnected')
    })

  mongoose.connect(
    process.env.DB_URL || 'mongodb://localhost:27017/BookCrudAPI'
  )
}

module.exports = { connectDB }
