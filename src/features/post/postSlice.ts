import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from "axios";

export const postSlice = createSlice({
    name: 'post',
    initialState: {
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

    }
  });
  

export default postSlice.reducer;