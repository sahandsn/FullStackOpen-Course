import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'none',
    reducers: {
        notificationShow: (state, action) => {

        }
    }
})

// export const { vote, newAnecdote } = anecdoteSlice.actions
export default notificationSlice.reducer