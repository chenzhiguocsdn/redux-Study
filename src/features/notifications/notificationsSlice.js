import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    // 数组解构，区分{ getSate } 对象解构
    const [latesNotification] = allNotifications
    const latesTimestamp = latesNotification ? latesNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latesTimestamp}`
    )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    allNotificationsRead(state, action) {
      state.forEach(notification => {
        notification.read = true
      })
    }
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.forEach(notification => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read
      })
      state.push(...action.payload)
      // array.sort() 会改变现有数组, 但是createSlice 和 Immer 内使用时安全的
      state.sort((a, b) => b.date.localeCompare(a.date))
    },
  },
})

export default notificationsSlice.reducer
export const { allNotificationsRead } = notificationsSlice.actions
export const selectAllNotifications = (state) => state.notifications
