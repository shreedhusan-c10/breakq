const { createSlice } = require('@reduxjs/toolkit');
const userSlice = createSlice({
    name:"user",
    initialState: {
        user: {}
    },
    reducers: {
        login(state, action) {
            const user = action.payload;
            if(user) {
                state.user = user;
            }
        },
        logout(state, action) {
            state.user = {};
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
