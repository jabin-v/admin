import  {createSlice} from "@reduxjs/toolkit";


const statsSlice=createSlice({
    name:"stats",
    initialState:{
        compareIncome:[],
        monthlyIncome:[],
        
    },
    reducers:{
        setIncome:(state,action)=>{

            state.compareIncome=action.payload;
           
        },
        setMonthlyIncome:(state,action)=>{

            state.monthlyIncome=action.payload;
           
        },
       
    }

})


export const {setIncome}=statsSlice.actions;
export default statsSlice.reducer;

export const compareIncome=(state)=>state.stats.compareIncome;
export const selectMonthlyIncome=(state)=>state.stats.monthlyIncome;
// export const selectCurrentRoles=(state)=>state.auth.roles;
// export const selectCurrentToken=(state)=>state.auth.token;