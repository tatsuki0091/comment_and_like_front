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

export interface USER_INFO {
    user_id: number;
}

// export interface NEW_COUNT_LIKE_AND_COMMENTS {
//     id: number;
//     text: string;
//     count:number;
//     liked:boolean;
//     user_id: number;
//     created_at: string;
    
// }

export interface NEW_COUNT_LIKE_AND_COMMENTS {

    countLikeAndComments:{
        id: number;
        text: string;
        count:number;
        liked:boolean;
        user_id: number;
        created_at: string;
    }[]
    
    
}