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
    _id: string;
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