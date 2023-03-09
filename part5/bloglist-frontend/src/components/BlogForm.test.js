import React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the recieved handler properly', async () => {
  const mockAddBlog = jest.fn()
  const { container } = render(<BlogForm addBlog={mockAddBlog} />)
  const user = userEvent.setup()

  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const create = screen.getByText('Create')

  await user.type(title, 'a title')
  await user.type(author, 'an author')
  await user.type(url, 'a url')
  await user.click(create)

  expect(mockAddBlog.mock.calls[0][0].title).toBe('a title')
  expect(mockAddBlog.mock.calls[0][0].author).toBe('an author')
  expect(mockAddBlog.mock.calls[0][0].url).toBe('a url')
  expect(mockAddBlog.mock.calls).toHaveLength(1)
})
