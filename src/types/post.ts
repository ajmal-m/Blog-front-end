
export type Post = {
    title: string;
    description: string;
    _id?:string;
    createdAt?:string;
    htmlContent?:string;
    htmlObject?:Object;
    author?: {
        _id: string;
        name: string;
        email: string;
        password : string;
    };
    thumbnail?:{
        src?: string;
        alt?: string;
    },
    likeCount?: number,
    hasLiked?: boolean | undefined,
    comments?:object[],
    creadtedAt?:string;
}
export type PostStoreState = {
    posts:Post[];
    currentPage:number;
    limit:number;
    nextPage:boolean;
    loading:boolean;
}

export type FetchPostResponse = {
    success: boolean;
    posts : Post[],
    nextPage :boolean;
    totalPages : number;
}

export type FetchPostArgs = {
    limit:number;
    page: number;
}