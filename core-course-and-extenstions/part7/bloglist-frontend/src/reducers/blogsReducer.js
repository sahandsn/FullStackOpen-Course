import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newBlog(state, action) {
      return state.concat(action.payload)
    },
    getBlogs(state, action) {
      return [...action.payload].sort((a, b) => b.likes - a.likes)
    },
    likeBlog(state, action) {
      return state
        .map((blog) =>
          blog.id !== action.payload.id
            ? blog
            : { ...blog, likes: blog.likes + 1 }
        )
        .sort((a, b) => b.likes - a.likes)
    },
    deleteBlog(state, action) {
      return state
        .filter((blog) => blog.id !== action.payload.id)
        .sort((a, b) => b.likes - a.likes)
    },
    commentBlog(state, action) {
      return state
        .map((blog) =>
          blog.id !== action.payload.id
            ? blog
            : { ...blog, comments: [...action.payload.comments] }
        )
        .sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { newBlog, getBlogs, likeBlog, deleteBlog, commentBlog } =
  blogSlice.actions
export default blogSlice.reducer
