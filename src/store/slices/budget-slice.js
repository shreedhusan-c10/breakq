const {createSlice} = require('@reduxjs/toolkit');
const budgetSlice = createSlice({
    name: "budget",
    initialState: {
        budget: 0
    },
    reducers: {
        addToBudget(state, action) {
            const budget = action.payload;
            if(budget > 0) {
                state.budget = budget;
            }
        }
    }
})

export const { addToBudget } = budgetSlice.actions;
export default budgetSlice.reducer;