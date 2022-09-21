import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postSlice'
import usersReducer from '../features/uses/usesSlice'


export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  },
})
