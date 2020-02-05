const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce((sum, likes) => sum + likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const likes = blogs.map(blog => blog.likes)
  return blogs[likes.indexOf(Math.max(...likes))]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const authors = blogs.map(blog => blog.author)
  const occurrences = lodash.countBy(authors)
  const sorted = lodash.chain(occurrences)
    .map((cnt, author) => {
      return {
        author: author,
        blogs: cnt
      }
    })
    .sortBy('count')
    .value()

  return sorted[sorted.length-1]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const authors = blogs.map(blog => blog.author)
  const uniqueAuthors = [...new Set(authors)]
  const likes = []
  for (let index = 0; index < uniqueAuthors.length; index++) {
    let author = uniqueAuthors[index]
    let likesOfAuthor = blogs.filter(blog => blog.author === author).map(blog => blog.likes)
    let sumOfLikes = likesOfAuthor.reduce((sum, num) => sum + num, 0)
    likes.push({ author: author, likes: sumOfLikes })
  }
  return favoriteBlog(likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}