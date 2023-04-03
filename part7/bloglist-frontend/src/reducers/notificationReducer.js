import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, mode: 'green' },
  reducers: {
    notificationShow: (state, action) => {
      return action.payload
    },
    notificationHide: () => {
      return { message: null, mode: 'green' }
    },
  },
})

export const { notificationShow, notificationHide } = notificationSlice.actions

export const setNotification = (obj, seconds) => {
  return async (dispatch) => {
    dispatch(notificationShow(obj))
    setTimeout(() => {
      dispatch(notificationHide())
    }, seconds * 1000)
  }
}
export default notificationSlice.reducer
