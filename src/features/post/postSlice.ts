import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "axios";
import {PROPS_COMMENT} from "../types"

const apiURL = process.env.REACT_APP_DEV_API_URL;


export const fetchAsyncPostComment = createAsyncThunk(
    "comment/post",
    async (comment: PROPS_COMMENT) => {
        const res = await axios.post(`${apiURL}api/comment`, comment,{
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res.data;
});


export const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoadingPost: false,
        posts: [
            {
                id:0,
                title: "",
                userPost: 0,
                created_on: "",
                img: "",
                liked: [0],
            }
        ],
        comments: [
            {
                id: 0,
                text: "",
                userComment: 0,
                post: 0,
            }
          ]
    },
    reducers: {
        fetchPostStart(state) {
            state.isLoadingPost = true;
        },
        fetchPostEnd(state) {
            state.isLoadingPost = false;
        },

    }
  });

// Register about Reducer things
export const { 
    fetchPostStart, 
    fetchPostEnd, 
} = postSlice.actions;
  

export default postSlice.reducer;