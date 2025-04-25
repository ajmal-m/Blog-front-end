import BackEnd from "../config";
import { Post, User } from "../types";

// Get  all Posts
export const getPosts = async() => {
    const {data} = await BackEnd.get('/post/posts');
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
export const UpdatePost = async ({ postId, postData }: { postId: string | undefined, postData: Post }) => {
    const {data} = await BackEnd.put(`/post/update`, {
        id: postId,
        ...postData
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