import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //status: success, resolved, rejected
    status: '',
    firstname: '',
    lastname: '',
    error: null
}
export const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setProfile: {
            prepare: (firstname, lastname) => ({
                payload: { firstname, lastname }
            }),
            reducer: (state, action) => {
                state.status = "success"
                state.firstname = action.payload.firstname
                state.lastname = action.payload.lastname
                state.error = null;
                return;
            }
        },
        failSetProfile: {
            prepare: (error) => ({
                payload: { error }
            }),
            reducer: (state, action) => {
                state.status = "rejected"
                state.firstname = ''
                state.lastname = ''
                state.error = action.payload.error
                return;
            }
        },
        updateProfile: {
            prepare: (firstname, lastname) => ({
                payload: { firstname, lastname }
            }),
            reducer: (state, action) => {
                state.status = "success"
                state.firstname = action.payload.firstname
                state.lastname = action.payload.lastname
                state.error = null;
                return;
            }
        },
        resetProfile: {
            reducer: () => {
                return initialState
            }
        }

    }
})

export default userSlice.reducer;
export const { setProfile, resetProfile, failSetProfile, updateProfile } = userSlice.actions;