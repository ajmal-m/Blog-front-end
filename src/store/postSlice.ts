import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types"


type PostType = {
    posts:Post[];
    currentPage:number;
    limit:number;
    nextPage:boolean;
}


const initialState: PostType = {
    posts:[],
    currentPage:1,
    limit:10,
    nextPage:true
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
    }
});


export const {updatePosts, updatePage, updateLimit, updateNextPage, clearPosts} = postSlice.actions;
export default postSlice.reducer;