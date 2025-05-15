import BackEnd, { FormTypeBackend} from "../config";
import { Post, User } from "../types";

// Get  all Posts
export const getPosts = async({ page , limit} : { page : number; limit : number;}) => {
    const {data} = await BackEnd.get(`/post/posts?page=${page}&limit=${limit}` );
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
export const uploadImage = async (formData : FormData) => {
    const {data} = await FormTypeBackend.post('/asset-upload',formData);
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