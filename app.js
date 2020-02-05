const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogsRouter')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')


logger.info('connecting to ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true })
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error(error.message))

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

module.exports = app