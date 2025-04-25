export type Post = {
    title: string;
    description: string;
    _id?:string;
    createdAt?:string;
}


export type User = {
    name: string;
    email: string;
    password: string;
    confirmPassword ?: string;
}