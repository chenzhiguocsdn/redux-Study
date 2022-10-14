import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postSlice'
import usersReducer from '../features/uses/usesSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notification: notificationsReducer
  },
})
