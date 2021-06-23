import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState  } from '../../app/store';
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

export const fetchAsyncGetComments = createAsyncThunk(
    "comment/get",
    async () => {
        const res = await axios.get(`${apiURL}api/comment`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res.data;
});


export const postSlice = createSlice({
    name: 'post',
    initialState: {
        liked: false,
        comments: [
            {
                id: 0,
                text: "",
                user_id: 0,
                created_at: "",
            }
          ]
    },
    reducers: {
        setLiked(state) {
            state.liked = true;
        },
        resetLiked(state) {
            state.liked = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGetComments.fulfilled, (state, action) => {
            return {
                ...state,
                comments: action.payload,
            }
        });
        builder.addCase(fetchAsyncPostComment.fulfilled, (state, action) => {
            return {
                ...state,
                comments: [...state.comments, action.payload],
            }
        });
      }
  });


export const { 
    setLiked, 
    resetLiked, 
} = postSlice.actions;


// Comments state
export const selectComments = (state: RootState) => state.post.comments;
export const selectLiked = (state: RootState) => state.post.liked;
export default postSlice.reducer;