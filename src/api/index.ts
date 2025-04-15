import BackEnd from "../config";

// Get Users List
export const getUsers = async() => {
    const {data} = await BackEnd.get('/post/posts');
    return data;
};