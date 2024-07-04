import { createAsyncThunk } from '@reduxjs/toolkit'
import { HttpStatusCode } from '~/Constants/httpStatusCode.enum'
import { ApiUserService } from '~/Repositories'
import { setIsLoggedIn } from './reducers'

const VerifyLogout = createAsyncThunk('user/VerifyLogout', async (_, { dispatch }) => {
  try {
    const response = await ApiUserService.VerifyLogout()
    if (response.status === HttpStatusCode.Ok) {
      dispatch(setIsLoggedIn(false))
    }
  } catch (e: any) {
    console.error(e.message)
    throw e
  }
})

export { VerifyLogout }
