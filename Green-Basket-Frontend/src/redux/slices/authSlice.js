import {createSlice} from '@reduxjs/toolkit'


const authSlice = createSlice({
    name:"auth",
    initialState:{
        token:null,
        user:null,
        isAuthenticated: false
    },
    reducers:{
        loginSuccess:(state,action)=>{
            state.token=action.payload.token
            state.user=action.payload.user
            state.isAuthenticated = true

        },
        logOut:(state,action)=>{
            state.token = null
            state.user = null
            state.isAuthenticated=false
           
        }
    }
});


export const { loginSuccess,logOut } = authSlice.actions;

export default authSlice.reducer;



