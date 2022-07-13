import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
            console.log('fetchUserData => response ', data, response.status)
            if (response.status === 200) {
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

export const fetchEditUserData = createAsyncThunk(
    'user',
    async ({ firstname, lastname, token }, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile',
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        firstName: firstname,
                        lastName: lastname
                    })
                })

            let data = await response.json()
            console.log('fetchEditUserData => ', data, response.status)
            if (response.status === 200) {
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

/**
 * User Slice (State + Reducer + Actions)
 * @param {object} initialState       
 * @param {object} state
 * 
 * properties =>
 * @param {string} email         user email
 * @param {string} firstname     user firstname
 * @param {string} lastname      user lastname
 * @param {boolean} isFetching   isFetching
 * @param {boolean} hasError     hasError
 * @param {string} errorMessage  errorMessage
 * @param {boolean} toEdit:      toEdit
 * 
 */
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstname: '',
        lastname: '',
        isFetching: false,
        hasError: false,
        errorMessage: '',
        toEdit: false
    },
    reducers: {
        clearUserState: (state) => {
            state.firstname = ''
            state.lastname = ''
            state.isFetching = false
            state.hasError = false
            state.errorMessage = ''
            state.toEdit = false
            return state
        },
        editUserInfo: (state) => {
            state.toEdit = true
        },
        removeEdit: (state) => {
            state.toEdit = false
        }
    },
    extraReducers: {
        [fetchUserData.fulfilled]: (state, { payload }) => {
            state.firstname = payload.body.firstName
            state.lastname = payload.body.lastName
            state.isFetching = false
            return state
        },
        [fetchUserData.rejected]: (state, { payload }) => {
            state.hasError = true
            state.errorMessage = payload.message
            return state
        },
        [fetchUserData.pending]: (state) => {
            state.isFetching = true
            return state
        },
        [fetchEditUserData.fulfilled]: (state, { payload }) => {
            state.firstname = payload.body.firstName
            state.lastname = payload.body.lastName
            state.isFetching = false
            return state
        },
        [fetchEditUserData.rejected]: (state, { payload }) => {
            state.hasError = true
            state.errorMessage = payload.message
            return state
        },
        [fetchEditUserData.pending]: (state, { payload }) => {
            state.isFetching = true
            return state
        }
    }

})

export const { clearUserState, editUserInfo, removeEdit } = userSlice.actions
export const userState = (state) => state.user