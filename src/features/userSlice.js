//have a thunk that fetches user data
//have a createSlice that creates the reducer and actions on the state
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const fetchUserData = createAsyncThunk(
    'user',
    async ({ token }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            let data = await response.json();
            console.log('fetchUserData => response', data, response.status)
            if (response.status === 200) {
                console.log(data)
                return { ...data }
            }
            else {
                return thunkAPI.rejectWithValue(data)
            }
        }
        catch (e) {
            console.log('Error', e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const userSlice = createSlice({
    name: "userReducer",
    initialState: {
        email: '',
        firstname: '',
        lastname: '',
        id: '',
        isFetching: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearUserState: (state) => {
            state.email = ''
            state.firstname = ''
            state.lastname = ''
            state.id = ''
            state.isFetching = false
            state.isError = false
            state.errorMessage = ''
            return state
        }
    },
    extraReducers: {
        [fetchUserData.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.email = payload.body.email
            state.firstname = payload.body.firstName
            state.lastname = payload.body.lastName
            state.id = payload.body.id
            state.isFetching = false
            state.isError = false
            state.errorMessage = ''
            return state
        },
        [fetchUserData.rejected]: (state, { payload }) => {
            console.log("rejected")
            console.log(payload)
            state.isError = true
            return state
        },
        [fetchUserData.pending]: (state, { payload }) => {
            state.isFetching = true
            return state
        }
    }

})

export const { clearUserState } = userSlice.actions
export const userState = (state) => state.user