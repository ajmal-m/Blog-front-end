import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type CommentType = {
    comments: string[]
}
const initialState: CommentType = {
    comments:[],
};

const commentSlice = createSlice({
    name:"comment",
    initialState,
    reducers:{
        updateComments:(state, action : PayloadAction<{ comments: string[]}>) => {
            state.comments = [  ...action.payload.comments];
        },
        clearComments:(state) => {
            state.comments = [];
        }
    }
});

export const {updateComments, clearComments} = commentSlice.actions;
export default commentSlice.reducer;