import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        }
    }
});

export const { setToken, setUser } = authSlice.actions;
export const currentState = state => state.auth

export default authSlice.reducer