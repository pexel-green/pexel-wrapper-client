import { createSlice } from '@reduxjs/toolkit'
import { endpoints } from './services/authService'
const initialState = {
    id: null,
    email: null,
    type: null,
    isAuthenticated: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState(state) {
            state.id = null
            state.email = null
            state.type = null
            state.isAuthenticated = null
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(endpoints.verifyToken.matchFulfilled, (state, { payload }) => {
            if (payload) {
                state.id = payload.id
                state.type = payload.type
                state.email = payload.email
                state.isAuthenticated = true
            }
        })
    }
})

export const { resetUserState } = userSlice.actions

export default userSlice.reducer