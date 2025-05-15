import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {UserState} from '../types/index';
import { VerifyToken } from "../api";



// Create the thunk
export const verifyTokenThunk = createAsyncThunk<UserState>(
    'user/verifyToken',
    async () => {
        const response = await VerifyToken();
        if(response?.success){
            return {
                name: response?.user?.name,
                email: response?.user?.email,
                id: response?.user?.id,
                loggedIn : true,
            }
        }else{
            return{
                loggedIn : false,
                name:"",
                email:"",
                id:""
            }
        }
    }
)

const initialState: UserState = {
    name:"",
    email:"",
    id:'',
    loggedIn:false,
};

const userSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        updateUser:(state, action : PayloadAction<UserState>) => {
            const {name, email, id, loggedIn} = action.payload;
            state.name = name;
            state.email = email;
            state.id = id;
            state.loggedIn = loggedIn;
        },
        logOutUser:(state) => {
            localStorage.removeItem("token");
            state.loggedIn = false;
            state.name ="";
            state.email = "";
            state.id = "";
        }
    },
    extraReducers(builder) {
        builder.addCase(verifyTokenThunk.pending, (state) => {
            state.loggedIn = false;
        })

        builder.addCase(verifyTokenThunk.fulfilled, (state, action : PayloadAction<UserState>) =>{
            const {name, email, id, loggedIn} = action.payload;
            state.name = name;
            state.email = email;
            state.id = id;
            state.loggedIn = loggedIn;
        })

        builder.addCase(verifyTokenThunk.rejected, (state) => {
            state.loggedIn = false;
        })
    },
});

export const {updateUser, logOutUser} = userSlice.actions;
export default userSlice.reducer;