const listHelper = require('../utils/list_helper')

const blogs = [{
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

const blog = [{
  'title': 'foods',
  'author': 'Nelly Fortado',
  'url': 'url',
  'likes': 2
}]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes of', () => {
  test('empty list if zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('list of one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blog)
    expect(result).toBe(2)
  })

  test('bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(13)
  })
})

describe('The blog having the most likes', () => {
  test('none if there is no blogs', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('is the only one when there is ony one blog', () => {
    const result = listHelper.favoriteBlog(blog)
    const mostLikes = {
      'title': 'foods',
      'author': 'Nelly Fortado',
      'url': 'url',
      'likes': 2
    }
    expect(result).toEqual(mostLikes)
  })

  test('the one with most likes when there are multiple blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    const mostLikes = {
      'title': 'dogs',
      'author': 'Billy Jean',
      'url': 'url',
      'likes': 5
    }
    expect(result).toEqual(mostLikes)
  })
})

describe('The author having the most blogs', () => {
  test('is none when there is no blogs', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('is the only one when there is only one', () => {
    const authorHavingMostBlogs = {
      'author': 'Nelly Fortado',
      'blogs': 1
    }
    const result = listHelper.mostBlogs(blog)
    expect(result).toEqual(authorHavingMostBlogs)
  })

  test('is author with the most blogs when there are multiple authors', () => {
    const authorHavingMostBlogs = {
      'author': 'Billy Jean',
      'blogs': 3
    }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(authorHavingMostBlogs)
  })
})

describe('Most likes have', () => {
  test('none when there is no blogs', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('the only one when there is only one', () => {
    const authorHavingMostLikes = {
      'author': 'Nelly Fortado',
      'likes': 2
    }
    const result = listHelper.mostLikes(blog)
    expect(result).toEqual(authorHavingMostLikes)
  })

  test('the one with most likes when there are mulitple blogs', () => {
    const authorHavingMostLikes = {
      'author': 'Billy Jean',
      'likes': 11
    }
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(authorHavingMostLikes)
  })
})
