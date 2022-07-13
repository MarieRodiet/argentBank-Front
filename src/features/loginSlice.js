import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchUserByInputs = createAsyncThunk(
    'login',
    async ({ email, password, rememberMe }, thunkAPI) => {
        try {
            const response = await fetch(
                'http://localhost:3001/api/v1/user/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );
            let data = await response.json()
            console.log('fetchUserByInputs => response', data)
            if (response.status === 200) {
                return {
                    ...data,
                    keepToken: rememberMe,
                    token: data.body.token

                };
            } else
                return thunkAPI.rejectWithValue(data)
        } catch (e) {
            console.log('Error', e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

/**
 * Login Slice (State + Reducer + Actions)
 * @param {object} initialState       
 * @param {object} state
 * 
 * properties =>
 * @param {boolean} isFetching   isFetching data
 * @param {boolean} hasError     fetching caused an hasError
 * @param {string} errorMessage  errorMessage
 * @param {boolean} isLogged     user isLogged
 * @param {boolean} keepToken    user wants to keep the token
 * @param {string} token         user token
 * 
 */
export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isFetching: false,
        hasError: false,
        errorMessage: '',
        isLogged: false,
        keepToken: false,
        token: ''
    },
    /*The reducers property both creates an action creator function and 
    responds to that action in this slice reducer. */
    reducers: {
        clearLoginState: (state) => {
            state.hasError = false
            state.isFetching = false
            state.errorMessage = ''
            state.isLogged = false
            state.token = ''
            return state
        },
        clearToken: (state) => {
            state.keepToken = false
            state.token = ''
            return state
        }
    },
    /**The extraReducers allows you to respond to an action 
     * that you have already defined somewhere else */
    extraReducers: {
        [fetchUserByInputs.fulfilled]: (state, { payload }) => {
            state.keepToken = payload.keepToken
            state.token = payload.token
            state.isFetching = false
            state.isLogged = true
            return state
        },
        [fetchUserByInputs.rejected]: (state, { payload }) => {
            console.log('payload', payload)
            state.isFetching = false
            state.hasError = true
            state.errorMessage = payload.message
            state.isLogged = false
            return state
        },
        [fetchUserByInputs.pending]: (state) => {
            state.isFetching = true
            state.isLogged = false
            return state
        },
    },
});

export const { clearLoginState, clearToken } = loginSlice.actions

// const { errorMessage, isLogged } = useSelector(loginState)
//used useSelector(loginState) to access the state + renders again when changed
export const loginState = (state) => state.login