const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  expect(titles).toContain('foods')
})

test('_id is id', async () => {
  const response = await api.get('/api/blogs')
  const blogObject = response.body[0]
  const keys = Object.keys(blogObject)

  expect(keys).toContain('id')
})

test('blog can be added', async () => {
  const blog = new Blog({
    title: 'test blog',
    author: 'tester',
    url: 'http://',
    likes: 5
  })

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('if no value is set for likes it is set to 0', async () => {
  const blog = new Blog({
    title: 'test blog',
    author: 'tester',
    url: 'http://',
    likes: null
  })
  const response = await api
    .post('/api/blogs')
    .send(blog)
  expect(response.body.likes).toBe(0)
})

test('if no title and url respond with  status code 404', async () => {
  const blog = new Blog({
    author: 'tester',
    likes: null
  })
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(404)
})

describe('when delete is applied', () => {
  test('a blog with spesific id can be removed and status code 204 returned', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    await expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.title)

    await expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('values of blogs', () => {
  test('can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      'id': blogToUpdate.id,
      'title': blogToUpdate.title,
      'author': blogToUpdate.author,
      'url': blogToUpdate.url,
      'likes': 5
    }
    await api.
      put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
  })
})

describe('Deleting of a blog', () => {
  test('allowed by the person who created blog', async () => {
    const newUser = {
      username: 'test',
      name: 'test',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)

    await api
      .post('/api/login')
      .send({ username: 'test', password: 'password' })

    await Blog.deleteMany({})

    const blog = {
      'title': 'foods',
      'author': 'Nelly Fortado',
      'url': 'url',
      'likes': 2,
    }

    await api
      .post('/api/blogs')
      .send(blog)

    const savedBlog = await Blog.find({})
    const data = savedBlog.map(blog => blog.toJSON())
    const id = data[0].id

    const response = await api
      .delete(`/api/blogs/${id}`)
  })
  test('allowed only by he one who created the blog', async () => {

  } )
})


afterAll(() => {
  mongoose.connection.close()
})