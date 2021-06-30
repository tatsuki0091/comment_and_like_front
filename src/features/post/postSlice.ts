import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState  } from '../../app/store';
import axios from "axios";
import {PROPS_COMMENT, PROPS_LIKE, USER_INFO} from "../types"

const apiURL = "https://buddy-tree-backend-api.herokuapp.com/";

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
        const res = await axios.post(`${apiURL}api/post_comment`, comment,{
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res.data;
});

export const fetchAsyncGetCommentsAndLikeCounts = createAsyncThunk(
    "comment/get",
    async (user_info: USER_INFO) => {
        const res = await axios.get(`${apiURL}api/get_comment/${user_info}`, {
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
});

export const fetchAsyncDeleteLike = createAsyncThunk(
    "like/delete",
    async (like: PROPS_LIKE) => {
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

// export const fetchAsyncGetLikes = createAsyncThunk(
//     "like/get",
//     async () => {
//         const res = await axios.get(`${apiURL}api/count_like`, {
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         });
//         return res.data;
// });

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoadingPost: false,
        commentsAndLikeCounts: [
            {
                id: 0,
                text: "",
                count:0,
                liked:false,
                user_id: 0,
                created_at: "",

            }
        ],
        countLike: [
            {
                count: 0
            }
        ],
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
        fetchCount(state, action) {
            return {
                ...state,
                commentsAndLikeCounts: action.payload,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGetCommentsAndLikeCounts.fulfilled, (state, action) => {
            return {
                ...state,
                commentsAndLikeCounts: action.payload,
            }
        });
        builder.addCase(fetchAsyncPostComment.fulfilled, (state, action) => {
            return {
                ...state,
                commentsAndLikeCounts: [...state.commentsAndLikeCounts, action.payload],
            }
        });
        // builder.addCase(fetchAsyncGetLikes.fulfilled, (state, action) => {
        //     return {
        //         ...state,
        //         countLike: action.payload,
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
    fetchCount
    
} = postSlice.actions;


// Comments state
export const selectIsLoadingPost = (state: RootState) => state.post.isLoadingPost;
export const selectCommentsAndLikeCounts = (state: RootState) => state.post.commentsAndLikeCounts;
export const selectLike = (state: RootState) => state.post.like;
export const selectLikeCount = (state: RootState) => state.post.countLike;
// export const selectIsFavorite = (state: RootState) => state.post.isLoadingPost;
export default postSlice.reducer;