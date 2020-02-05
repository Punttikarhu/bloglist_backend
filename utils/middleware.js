const morgan = require('morgan')

morgan.token('data', function(req) {
  return JSON.stringify(req.body)
})

const morganLogger = morgan(':method :status - :response-time ms :data')

const requestLogger = async (req, res, next) => {
  console.log('Method', req.method)
  console.log('Path', req.path)
  console.log('Body', req.body)
  console.log('---')
  next()
}

const unknownEndpoint = async (req, res) => {
  await res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = async (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }
  next(error)
}

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  morganLogger,
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}