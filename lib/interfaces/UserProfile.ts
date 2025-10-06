export interface UserProfile{
    id:string;
    username:string;
    email:string;
    avatar_url:string;
    bio:string;
    followers_count:number;
    following_count:number;
    post_count:number;
    download_count:number;
    follower_count:number;
    created_at:Date;
}
export interface Template 
{
    id:number;
    templateTitle:string;
    templateDescription:string;
    templateTags:string;
    templateFile?:File | null;
    templateMode:string;
    templatePrompt?:string;
    templateVideo:File | null;
    templateThumbnail:File | null;
}
export interface Video{
    id:number;
    user_id:string;
    title:string;
    description:string;
    tags:[];
    file_url:string;
    preview_url:string;
    users:{
        id:number;
        username:string;
        email:string;
        avatar_url:string;
    };
    created_at:Date;
}