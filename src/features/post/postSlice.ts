import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState  } from '../../app/store';
import axios from "axios";
import {PROPS_COMMENT, PROPS_LIKED} from "../types"

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

export const fetchAsyncPostLiked = createAsyncThunk(
    "liked/post",
    async (liked: PROPS_LIKED) => {
        const res = await axios.post(`${apiURL}api/liked`, liked,{
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res.data;
        
        // let isOverlapped = false;
        // // 一度likeが押されている場合はそのユーザIDを抜くのでそのユーザの判定処理
        // currentLiked.forEach((current) => {
        //     if (current === liked.new) {
        //         isOverlapped = true;
        //     } else {
        //         uploadData.append("Liked", String(current))
        //     }
        // });

        // if(!isOverlapped) { 
        //     uploadData.append("liked", String(liked.new));
        // } else if(currentLiked.length === 1) {
        //     uploadData.append("title", liked.title);
        //     // httpのpatchメソッドだと何もない状態にすることができないのでputを使用
        //     const res = await axios.put(`${apiUrlPost}${liked.id}/`, uploadData, {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `JWT ${localStorage.localJWT}`
        //         }
        //     });
        //     return res.data
        // }

        // const res = await axios.patch(`${apiUrlPost}${liked.id}/`, uploadData, {
        //     headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `JWT ${localStorage.localJWT}`
        //     }
        // });
        // return res.data;

});

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoadingPost: false,
        liked: [
            {
                id: 0,
                comment_id: "",
                user_id: 0,
            }
          ],
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
        fetchPostStart(state) {
            state.isLoadingPost = true;
        },
        fetchPostEnd(state) {
            state.isLoadingPost = false;
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
        builder.addCase(fetchAsyncPostLiked.fulfilled, (state, action) => {
            return {
                ...state,
                liked: [...state.liked, action.payload],
            }
        });
      }
  });


export const { 
    fetchPostStart,
    fetchPostEnd,
} = postSlice.actions;


// Comments state
export const selectIsLoadingPost = (state: RootState) => state.post.isLoadingPost;
export const selectComments = (state: RootState) => state.post.comments;
export const selectLiked = (state: RootState) => state.post.liked;
export default postSlice.reducer;