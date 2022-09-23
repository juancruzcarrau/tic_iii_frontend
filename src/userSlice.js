import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'activeUser',
    initialState: {
        value: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.value.push(action.payload)
        },
        removeUser: (state) => {
            state.value.pop()
        },
        isAuthenticated: (state) => {
          return state.value !== {}
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser, isAuthenticated, removeUser } = userSlice.actions

export default userSlice.reducer