import { createSlice } from '@reduxjs/toolkit'
import { endpoints } from './services/authService'
const initialState = {
    id: null,
    email: null,
    isAuthenticated: null,
    container: null,
    selectImageData: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState(state) {
            state.id = null
            state.email = null
            state.isAuthenticated = null
            state.container = null
        },
        setSelectImage(state, { payload }) {
            state.selectImageData = payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(endpoints.verifyToken.matchFulfilled, (state, { payload }) => {
            console.log({ payload })
            if (payload) {
                state.id = payload.id
                state.email = payload.email
                state.isAuthenticated = true
                state.container = payload.containers
            }
        })
    }
})

export const { resetUserState, setSelectImage } = userSlice.actions

export default userSlice.reducer