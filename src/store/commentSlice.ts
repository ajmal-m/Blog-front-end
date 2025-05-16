import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPostComments } from "../api";
import {fetchCommentArg, fetchCommentResponse, CommentStoreState} from '../types/comment';

const initialState : CommentStoreState = {
    comments:[],
    currentPage:1,
    limit:10,
    nextPage:true,
    loading:false,
    message:"",
    error:false,
    showMoreLoader: false
};


// Fetch CommentPost
export const fetchPostCOmments = createAsyncThunk<fetchCommentResponse, fetchCommentArg, { rejectValue:{ success: boolean; message: string;}}>(
    "comments/postComments",
    async ({postId, page, limit}, thunkAPI) => {
        const data = await getPostComments({ postId, page, limit});
        if(!data.success){
            return thunkAPI.rejectWithValue(data);
        }else{
            return data;
        }
    }
)

const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        clearComments:(state) => {
            state.comments = [];
            state.currentPage = 1;
        },
        incrementPage:(state) => {
            state.currentPage = state.currentPage+1;
        },
        updateNextPage:(state, action : PayloadAction<{ nextPage: boolean}>) => {
            state.nextPage = action.payload.nextPage;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchPostCOmments.pending, (state) => {
            if(state.currentPage === 1) state.loading = true;
            if(state.currentPage > 1) state.showMoreLoader = true;
        })
        builder.addCase(fetchPostCOmments.fulfilled, (state, action) => {
            const {nextPage, comments} = action.payload;
            state.loading = false;
            state.showMoreLoader = false;
            state.error = false;
            state.comments = [ ...state.comments, ...comments];
            state.nextPage = nextPage;
        })
        builder.addCase(fetchPostCOmments.rejected, (state, action) => {
            state.loading = false;
            state.showMoreLoader = false;
            state.error = true;
            state.message = action.payload?.message || "";
        })
    },
});

export const {clearComments , updateNextPage, incrementPage} = commentSlice.actions;
export default commentSlice.reducer;