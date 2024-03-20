import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserAPI } from '../../apis/UserAPI.js'

const searchUsers = createAsyncThunk(
  'users/getAll',
  async ({ search = '', page = 1 }, { rejectWithValue }) => {
    try {
      const response = await UserAPI.searchUsers({ search, page })
      return response
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export { searchUsers }