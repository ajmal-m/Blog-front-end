import BackEnd from "../config";

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