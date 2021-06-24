import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState  } from '../../app/store';
import axios from "axios";
import {PROPS_COMMENT, PROPS_LIKE} from "../types"

const apiURL = process.env.REACT_APP_DEV_API_URL;

export const fetchAsyncIsFavorite = createAsyncThunk(
    "like/get",
    async (like: PROPS_LIKE) => {
    const res = await axios.get(`${apiURL}api/is_favorite/${like.user_id}/${like.comment_id}`, 
    {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res.data;
});


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

export const fetchAsyncPostLike = createAsyncThunk(
    "like/post",
    async (like: PROPS_LIKE) => {
        const res = await axios.post(`${apiURL}api/like`, like,{
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res.data;
        
        // let isOverlapped = false;
        // // 一度likeが押されている場合はそのユーザIDを抜くのでそのユーザの判定処理
        // currentLike.forEach((current) => {
        //     if (current === like.new) {
        //         isOverlapped = true;
        //     } else {
        //         uploadData.append("Like", String(current))
        //     }
        // });

        // if(!isOverlapped) { 
        //     uploadData.append("like", String(like.new));
        // } else if(currentLike.length === 1) {
        //     uploadData.append("title", like.title);
        //     // httpのpatchメソッドだと何もない状態にすることができないのでputを使用
        //     const res = await axios.put(`${apiUrlPost}${like.id}/`, uploadData, {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `JWT ${localStorage.localJWT}`
        //         }
        //     });
        //     return res.data
        // }

        // const res = await axios.patch(`${apiUrlPost}${like.id}/`, uploadData, {
        //     headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `JWT ${localStorage.localJWT}`
        //     }
        // });
        // return res.data;

});

export const fetchAsyncDeleteLike = createAsyncThunk(
    "like/delete",
    async (like: PROPS_LIKE) => {
        console.log('delete')
        const res = await axios.delete(`${apiURL}api/like`, {
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                like: like
            }
        });
        return res.data;
});

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoadingPost: false,
        isFavorite: false,
        like: [
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
        // builder.addCase(fetchAsyncIsFavorite.fulfilled, (state, action) => {
        //     return {
        //         ...state,
        //         like: action.payload,
        //     }
        // });
        builder.addCase(fetchAsyncPostLike.fulfilled, (state, action) => {
            return {
                ...state,
                like: [...state.like, action.payload],
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
export const selectLike = (state: RootState) => state.post.like;
export const selectIsFavorite = (state: RootState) => state.post.isLoadingPost;
export default postSlice.reducer;