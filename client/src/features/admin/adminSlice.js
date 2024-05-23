import { createSlice } from '@reduxjs/toolkit'
import { adminSearchUsers, adminUpdateUser } from './adminAction'

const initialState = {
  users: [],
  loading: false,
  error: null,
  meta: {
    page: 1,
    totalPages: 1,
    limit: 10,
  },
  searchQuery: {
    search: {
      fieldName: '',
      fieldValue: '',
    },
    filter: {
      fieldName: '',
      fieldValue: '',
    },
    sort: {
      sortby: '',
      sortValue: '',
    },
  },
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateSearchInput: (state, action) => {
      state.searchQuery.search.fieldValue = action.payload
    },
    updateSearchField: (state, action) => {
      state.searchQuery.search.fieldName = action.payload
    },
    updateSearchFilter: (state, action) => {
      const [fieldName, fieldValue] = action.payload.split(':')
      state.searchQuery.filter.fieldName = fieldName
      state.searchQuery.filter.fieldValue = fieldValue
    },
    updateSearchSort: (state, action) => {
      const [sortBy, sortValue] = action.payload.split(':')
      state.searchQuery.sort.sortBy = sortBy
      state.searchQuery.sort.sortValue = sortValue
    },
    resetSearchQuery: state => {
      state.searchQuery = initialState.searchQuery
    },
  },
  extraReducers: builder => {
    // Search Users
    builder.addCase(adminSearchUsers.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(adminSearchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.users = action.payload.users
      state.meta = action.payload.meta
    })
    builder.addCase(adminSearchUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.users = []
    })
    // Update User
    builder.addCase(adminUpdateUser.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(adminUpdateUser.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
    })
    builder.addCase(adminUpdateUser.rejected, state => {
      state.loading = false
      state.error = true
    })
    // Delete User
    // Add User
  },
})

export const {
  updateSearchInput,
  updateSearchField,
  updateSearchFilter,
  updateSearchSort,
  resetSearchQuery,
} = adminSlice.actions
export default adminSlice.reducer