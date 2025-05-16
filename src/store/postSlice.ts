import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types"
import { getPosts } from "../api";


type PostType = {
    posts:Post[];
    currentPage:number;
    limit:number;
    nextPage:boolean;
    loading:boolean;
}

type FetchPostResponse = {
    success: boolean;
    posts : Post[],
    nextPage :boolean;
    totalPages : number;
}

type FetchPostArgs = {
    limit:number;
    page: number;
}



export const fetchPosts = createAsyncThunk<FetchPostResponse, FetchPostArgs>(
    "post/fetchPosts",
    async ( { page, limit}, thunkAPI) => {
        const data = await getPosts({page, limit});
        if(!data.success){
            thunkAPI.rejectWithValue(data);
        }
        return data;
    }
)

const initialState: PostType = {
    posts:[],
    currentPage:1,
    limit:10,
    nextPage:true,
    loading:true
};


const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        updatePosts:(state, action : PayloadAction<{ posts: Post[]}>) => {
            state.posts = [...state.posts, ...action.payload.posts]
        },
        updatePage:(state, action : PayloadAction<{ page: number;}>) => {
            state.currentPage = action.payload.page;
        },
        updateLimit:(state, action : PayloadAction<{ limit : number;}>) => {
            state.limit = action.payload.limit;
        },
        updateNextPage:(state, action : PayloadAction<{nextPage: boolean;}>) => {
            state.nextPage = action.payload.nextPage;
        },
        clearPosts:(state) => {
            state.currentPage = 1;
            state.nextPage = true;
            state.posts = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state) => {
            if(state.currentPage === 1) state.loading = true;
        })

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            if(state.currentPage === 1) state.loading = false;
            state.posts = [ ...state.posts, ...action.payload.posts];
            state.nextPage = action.payload.nextPage ;
        })

        builder.addCase(fetchPosts.rejected, (state) => {
            if(state.currentPage === 1) state.loading = false;
            state.posts = [];
            state.nextPage = false;
        })
    },
});


export const {updatePosts, updatePage, updateLimit, updateNextPage, clearPosts} = postSlice.actions;
export default postSlice.reducer;