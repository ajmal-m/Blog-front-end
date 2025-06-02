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
                avatar: response.user.avatar
            }
        }else{
            return{
                loggedIn : false,
                name:"",
                email:"",
                id:"",
                avatar:null
            }
        }
    }
)

const initialState: UserState = {
    name:"",
    email:"",
    id:'',
    loggedIn:false,
    loading:false,
    avatar: null
};

const userSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        updateUser:(state, action : PayloadAction<UserState>) => {
            const {name, email, id, loggedIn, avatar} = action.payload;
            state.name = name;
            state.email = email;
            state.id = id;
            state.loggedIn = loggedIn;
            state.avatar = avatar;
        },
        logOutUser:(state) => {
            localStorage.removeItem("token");
            state.loggedIn = false;
            state.name ="";
            state.email = "";
            state.id = "";
        },
        updateUserDetail: (state, action: PayloadAction<{name : string,avatar: string | null}>) => {
            const {name, avatar} = action.payload;
            state.name = name;
            state.avatar = avatar
        }
    },
    extraReducers(builder) {
        builder.addCase(verifyTokenThunk.pending, (state) => {
            state.loggedIn = false;
            state.loading = true;
        })

        builder.addCase(verifyTokenThunk.fulfilled, (state, action : PayloadAction<UserState>) =>{
            const {name, email, id, loggedIn, avatar} = action.payload;
            state.name = name;
            state.email = email;
            state.id = id;
            state.loggedIn = loggedIn;
            state.loading = false;
            state.avatar = avatar;
        })

        builder.addCase(verifyTokenThunk.rejected, (state) => {
            state.loggedIn = false;
            state.loading = false;
        })
    },
});

export const {updateUser, logOutUser, updateUserDetail} = userSlice.actions;
export default userSlice.reducer;