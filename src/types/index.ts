export type Post = {
    title: string;
    description: string;
    _id?:string;
    createdAt?:string;
    htmlContent?:string;
    htmlObject?:Object,
    author?: {
        _id: string;
        name: string;
        email: string;
        password : string;
    };
}


export type User = {
    name: string;
    email: string;
    password: string;
    confirmPassword ?: string;
}