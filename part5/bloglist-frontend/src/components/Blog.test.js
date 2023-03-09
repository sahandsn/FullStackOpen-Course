import React from 'react'
import userEvent from '@testing-library/user-event'
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
  const user = {
    name: 'sahand',
    username: 'sahandsn',
  }
  const blog = {
    title: 'a title',
    author: 'an author',
    url: 'a url',
    likes: 1,
    user: user,
  }

  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  test('only renders title and author by default', () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
        user={user}
      />
    )
    expect(container).toHaveTextContent('a title an author')
    expect(container).not.toHaveTextContent('a url')
    expect(container).not.toHaveTextContent('Likes: 1')
  })
  test('likes and url are shown after button is clicked', async () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
        user={user}
      />
    )
    const mockUser = userEvent.setup()
    const button = screen.getByText('View')
    await mockUser.click(button)
    expect(container).toHaveTextContent('a title by an author')
    expect(container).toHaveTextContent('a url')
    expect(container).toHaveTextContent('Likes: 1')
  })
  // eslint-disable-next-line quotes
  test("like's event handler is called properly", async () => {
    render(
      <Blog
        blog={blog}
        handleLike={mockLikeHandler}
        handleDelete={mockDeleteHandler}
        user={user}
      />
    )
    const mockUser = userEvent.setup()
    const revealButton = screen.getByText('View')
    await mockUser.click(revealButton)
    const likeButton = screen.getByText('Like')
    await mockUser.click(likeButton)
    await mockUser.click(likeButton)
    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
