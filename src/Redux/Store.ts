import { configureStore } from '@reduxjs/toolkit'
import { footballReducer } from '~/Redux/Football'
import { userReducer } from '~/Redux/Users'
import { modalReducer } from '~/Redux/Modal'

export const store = configureStore({
  reducer: {
    users: userReducer,
    modal: modalReducer,
    football: footballReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
