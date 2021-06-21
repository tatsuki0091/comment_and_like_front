export interface PROPS_LIKED {
    id: number;
    title:string;
    current:number[]
    new:number;
}

export interface PROPS_COMMENT {
    user_id:number;
    text: string;

}

export interface PROPS_LOGIN {
    email: string;
    password: string;

}