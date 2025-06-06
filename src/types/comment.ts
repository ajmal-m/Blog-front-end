import { CommentLike } from "./comment-like";

export type CommentStoreState = {
    comments: CommentType[],
    currentPage: number;
    limit:number;
    nextPage:boolean;
    loading:boolean;
    message:string;
    error:boolean;
    showMoreLoader:boolean;
};

export type CommentType = {
    createdAt: string;
    postId: string;
    text: string;
    updatedAt: string;
    userId:string;
    likes:string[] | CommentLike[],
    _id: string;
    hasLiked:boolean;
    likeCount:number;
    user : {
            _id: string;
            name: string;
            email: string;
            password : string;
            avatar:string|null;
        }
};


export type fetchCommentArg = {
    postId: string;
    page: number;
    limit: number;
};

export type fetchCommentResponse = {
    comments: CommentType[],
    success: boolean,
    nextPage: boolean;
    message ?: string;
    totalPages: number;
};