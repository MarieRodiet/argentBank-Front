import { createSlice } from '@reduxjs/toolkit'

//call useFetch with:
//url
//request options (method and payload)




//createSlice retourne un object avec name: le nom du slice, 
//le Reducer cree par redux, et un object contenant les actions creators
export const loginSlice = createSlice({
    name: 'loginReducer',
    initialState: {
        isLoggedIn: 'false',
        token: '',
        error: null,
    },
    reducers: {
        loginAction: {
            prepare: (token) => ({
                payload: { token }
            }),
            reducer: (state, action) => {
                if (action.payload.token && state.isLoggedIn === false) {
                    state.isLoggedIn = true;
                    state.error = null;
                    return;
                }
                return;
            }
        },
        //dispatch(actions.logout(token));
        logoutAction: {
            prepare: (token) => ({
                payload: { token }
            }),
            reducer: (state, action) => {
                if (action.payload.token && state.isLoggedIn === true) {
                    state.isLoggedIn = false;
                    state.error = null;
                    return;
                }
                return;
            }

        },
        failLogAction: {
            prepare: (error) => ({
                payload: { error }
            }),
            reducer: (state, action) => {
                state.error = action.payload.error;
                return;
            }
        }
    }
})

export default loginSlice.reducer;
export const { loginAction, logoutAction, failLogAction } = loginSlice.actions;


