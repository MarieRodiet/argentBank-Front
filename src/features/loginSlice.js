import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/*provide a string for the action type prefix and a payload creator 
callback that does the actual async logic and returns a promise with the result.
 In return, createAsyncThunk will give you a thunk that will take care of 
 dispatching the right actions based on the promise you return, 
 and action types that you can handle in your reducer */
export const fetchUserByInputs = createAsyncThunk(
    'login',
    async ({ email, password, rememberMe }, thunkAPI) => {
        console.log(rememberMe)
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
                localStorage.setItem('token', data.body.token)
                return {
                    ...data,
                    email: email,
                    keepToken: rememberMe
                };
            } else
                return thunkAPI.rejectWithValue(data)
        } catch (e) {
            console.log('Error', e.response.data)
            thunkAPI.rejectWithValue(e.response.data)
        }
    }
)


export const loginSlice = createSlice({
    name: 'loginReducer',
    initialState: {
        email: '',
        isFetching: false,
        isError: false,
        errorMessage: '',
        isLogged: false,
        keepToken: false
    },
    /*The reducers property both creates an action creator function and 
    responds to that action in this slice reducer. */
    reducers: {
        clearLoginState: (state) => {
            state.email = ''
            state.isError = false
            state.isFetching = false
            state.errorMessage = ''
            state.isLogged = false
            return state
        },
        clearToken: (state) => {
            window.localStorage.removeItem('token')
            state.keepToken = false
            return state
        }
    },
    /**The extraReducers allows you to respond to an action 
     * that you have already defined somewhere else */
    extraReducers: {
        [fetchUserByInputs.fulfilled]: (state, { payload }) => {
            state.email = payload.email
            state.keepToken = payload.keepToken
            state.isFetching = false
            state.errorMessage = ''
            state.isLogged = true
            return state
        },
        [fetchUserByInputs.rejected]: (state, { payload }) => {
            console.log('payload', payload)
            state.email = ''
            state.isFetching = false
            state.isError = true
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