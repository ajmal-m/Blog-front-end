import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type CommentType = {
    comments: string[],
    currentPage: number;
    limit:number;
    nextPage:boolean;
}
const initialState: CommentType = {
    comments:[],
    currentPage:1,
    limit:10,
    nextPage:true,
};

const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        updateComments:(state, action : PayloadAction<{ comments: string[]}>) => {
            state.comments = [ ...state.comments,  ...action.payload.comments];
        },
        clearComments:(state) => {
            state.comments = [];
            state.currentPage = 1;
            state.nextPage = true;
        },
        incrementPage:(state) => {
            state.currentPage = state.currentPage+1;
        },
        updateNextPage:(state, action : PayloadAction<{ nextPage: boolean}>) => {
            state.nextPage = action.payload.nextPage;
        }
    }
});

export const {updateComments, clearComments , updateNextPage, incrementPage} = commentSlice.actions;
export default commentSlice.reducer;