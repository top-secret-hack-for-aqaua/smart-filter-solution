import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@shared/lib';


interface initialState {
    accessToken: string,
    user: never | null
}

const intitialState: initialState = {
    accessToken: '',
    user: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState: intitialState,
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: () => intitialState,
    },
});
export const { setToken, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
