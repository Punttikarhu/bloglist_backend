const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'root', password: 'sekret' })
  await user.save()
})


describe('when there is initially one user at db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'sdds',
      name: 'Mdssdsdd',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('Validation of', () => {
  test('username has to be at least 3 characters long', async () => {
    const newUser = {
      username: 'a',
      name: 'Mdssfgddsdd',
      password: 'salainenfgg',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(403)

    expect(response.text).toEqual('Username has to be at least 3 characters long!')
  })

  test('password has to be at least 3 characters long', async () => {
    const newUser = {
      username: 'aaccdsf',
      name: 'Mdssfgddsdd',
      password: 'sa',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(403)

    expect(response.text).toEqual('Password has to be at least 3 characters long!')
  })
})


afterAll(() => {
  mongoose.connection.close()
})