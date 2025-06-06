import BackEnd, { FormTypeBackend} from "../config";
import { User } from "../types";
import {Post} from '../types/post';

// Get  all Posts
export const getPosts = async({ page , limit , q} : { page : number; limit : number; q : string;}) => {
    const {data} = await BackEnd.get(`/post/posts?page=${page}&limit=${limit}&q=${q}` );
    return data;
};


// Get post by Id
export const getPostById = async ({ id } : { id : string | undefined }) => {
    const {data} = await BackEnd.get(`/post/get-post/${id}`);
    return data;
}

// Create a Post
export const createPost = async ({ postData  } : { postData : Post}) => {
    const {data} = await BackEnd.post('/post/create', {
        ...postData,
        authorId:'67fab37751e1e2fa825f6653'
    });
    return data;
}


// Update a Post
export const UpdatePost = async ({ postId, htmlContent, htmlObject }: { postId: string | undefined, htmlObject: any; htmlContent: string;  }) => {
    const {data} = await BackEnd.put(`/post/update`, {
        id: postId,
        htmlContent,
        htmlObject
    });
    return data;
}


// Sign Up / Create User
export const CreateUser = async ({ userData} :{ userData: User}) => {
    const {data} = await BackEnd.post('/auth/sign-up', { ...userData});
    return data;
}


// Verify the token
export const VerifyToken = async() => {
    const {data} = await  BackEnd.get('/auth/verify-token');
    return data;
}


// LogIn/ Sign In
export const LogInUser = async ({ logInData} : { logInData : {  email: string; password: string} }) => {
    const {data} = await BackEnd.post('/auth/sign-in', {...logInData});
    return data;
}


// Create Blog POst
export const createHtmlPost = async({ htmlContent, htmlObject, authorId} : { authorId: string | undefined;htmlContent: string; htmlObject: Object | undefined;}) => {
    const {data} = await BackEnd.post('/post/create', {
        htmlContent,
        htmlObject,
        authorId
    });
    return data;
}


// Upload Image file
export const uploadImage = async (formData: FormData , width : number, height :number) => {
    const {data} = await FormTypeBackend.post(`/asset-upload?width=${width}&height=${height}`,formData);
    return data;
}

// Delete POst
export const deletePost = async ({ id }: { id: string | undefined}) => {
    const {data} = await BackEnd.post("/post/delete", {
        id
    });
    return data;
}

// Post Like Update
export const postLikeUpdate = async ({
    postId,userId, likeStatus
}: { postId: string | undefined; userId: string | undefined; likeStatus: 'like' | 'unlike'}) => {
    const {data} = await BackEnd.put("/post/update-like", {
        postId,
        userId,
        likeStatus
    });
    return data;
}

// get Post comments
export const getPostComments = async ({postId , page, limit }: { postId: string, page:number; limit:number }) => {
    const {data} = await BackEnd.get(`/post/comment/${postId}?page=${page}&limit=${limit}`);
    return data;
}

// Create comment for post
export const createPostComment = async ({ postId, text} : { postId: string; text: string;}) => {
    const {data} = await BackEnd.post('/post/comment/create', {
        postId,
        text
    });
    return data;
}

// Delete comment
export const deletePostComment = async({ commentId, postId }: { commentId : string; postId: string; }) => {
    const {data} = await BackEnd.delete(`/post/comment/${commentId}?postId=${postId}`);
    return data;
}


// Create comment Like
export const createCommentLike = async ({ commentId , postId }: { commentId : string; postId: string;}) => {
    const {data} = await BackEnd.post(`/post/comment/like/create`, {
        commentId,
        postId
    });
    return data;
}


// Delete Comment Like
export const deleteCommentLike = async ({ postId, commentId }: { postId : string; commentId: string;}) => {
    const {data} = await BackEnd.delete(`/post/comment/like/delete?postId=${postId}&commentId=${commentId}`);
    return data;
}


// Update User
export const updateUser = async ({name, password, avatar, id} : { name : string; password: string; avatar: string | null; id: string;}) => {
    const {data} = await BackEnd.put('/user/update', {
        name,
        password,
        avatar,
        id
    });
    return data;
}