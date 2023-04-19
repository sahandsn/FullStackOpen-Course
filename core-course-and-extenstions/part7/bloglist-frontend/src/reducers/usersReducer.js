import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getUsers(state, action) {
      return action.payload
    },
  },
})

export const { getUsers } = userSlice.actions
export default userSlice.reducer