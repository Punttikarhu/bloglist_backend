const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
  'title': 'foods',
  'author': 'Nelly Fortado',
  'url': 'url',
  'likes': 2
},
{
  'title': 'dogs',
  'author': 'Billy Jean',
  'url': 'url',
  'likes': 3
},
{
  'title': 'dogs',
  'author': 'Billy Jean',
  'url': 'url',
  'likes': 3
},
{
  'title': 'dogs',
  'author': 'Billy Jean',
  'url': 'url',
  'likes': 5
}]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'will be removed' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = Blog.find({})
  return blogs
}

const usersInDb = async () => {
  const users = User.find({})
  return users
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }