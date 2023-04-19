import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    nullUser() {
      return null
    },
  },
})

export const { setUser, nullUser } = userSlice.actions
export default userSlice.reducer
