// export interface PROPS_LIKE {
//     id: number;
//     title:string;
//     current:number[]
//     new:number;
// }

export interface PROPS_COMMENT {
    user_id:number;
    text: string;

}

export interface PROPS_LOGIN {
    email: string;
    password: string;

}

export interface PROPS_LIKE {
    comment_id: number;
    user_id: number;
}

export interface IS_FACORITE {
    comment_id: number;
    user_id: number;
}