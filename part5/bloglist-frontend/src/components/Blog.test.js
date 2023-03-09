import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

// test('blog only displays title and author by default', () => {
//   const blog = {
//     title: 'a blog',
//     author: ' an author',
//     url: 'a url',
//   }

//   const mockHandleLike = jest.fn()
//   const mockHandleDelete = jest.fn()

// })

describe('Blog component tests', () => {
  const blog = {
    title: 'a title',
    author: 'an author',
    url: 'a url',
    likes: 1,
  }

  const user = {
    name: 'sahand',
    username: 'sahandsn',
  }

  const mockUpdateBlog = jest.fn()
  const mockDeleteBlog = jest.fn()

  test('only renders title and author by default', () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockUpdateBlog}
        handleDelete={mockDeleteBlog}
        user={user}
      />
    )
    expect(container).toHaveTextContent('a title an author')
    expect(container).not.toHaveTextContent('a url')
    expect(container).not.toHaveTextContent('Likes: 1')
  })
})
