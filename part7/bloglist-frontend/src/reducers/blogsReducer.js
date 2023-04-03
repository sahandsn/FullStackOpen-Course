import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    newBlog(state, action) {
      state.concat(action.payload.savedBlog)
    },
    getBlogs(state, action) {
      return action.payload.blogs
    },
    likeBlog(state, action) {
      state
        .map((blog) =>
          blog.id !== action.payload.updatedBlog.id
            ? blog
            : { ...blog, likes: blog.likes + 1 }
        )
        .sort((a, b) => b.likes - a.likes)
    },
    deleteBlog(state, action) {
      state
        .filter((blog) => blog.id !== action.payload.deletedBlog.id)
        .sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { newBlog, getBlogs, likeBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
