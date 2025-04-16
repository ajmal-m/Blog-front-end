import BackEnd from "../config";

// Get  all Posts
export const getPosts = async() => {
    const {data} = await BackEnd.get('/post/posts');
    return data;
};