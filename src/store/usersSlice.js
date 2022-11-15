import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {}
})

export default usersSlice.reducer
