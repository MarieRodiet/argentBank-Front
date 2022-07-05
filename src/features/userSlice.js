import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUserData = createAsyncThunk(
    'userData',
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
    'userEditData',
    async ({ firstname, lastname }, thunkAPI) => {
        const token = localStorage.getItem('token')
        console.log("firstname" + firstname)
        console.log("lastname" + lastname)
        console.log("token" + token)
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

export const userSlice = createSlice({
    name: 'userReducer',
    initialState: {
        email: '',
        firstname: '',
        lastname: '',
        isFetching: false,
        hasError: false,
        errorMessage: '',
        toEdit: false
    },
    reducers: {
        clearUserState: (state) => {
            state.email = ''
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
        }
    },
    extraReducers: {
        [fetchUserData.fulfilled]: (state, { payload }) => {
            state.email = payload.body.email
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
            state.hasFetching = true
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
            state.hasFetching = true
            return state
        }
    }

})

export const { clearUserState, editUserInfo } = userSlice.actions
export const userState = (state) => state.user