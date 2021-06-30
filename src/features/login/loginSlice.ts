import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { PROPS_LOGIN } from "../types"

const apiURL = "https://buddy-tree-backend-api.herokuapp.com/";

export const fetchAsyncLogin = createAsyncThunk (
    "login/post",
    async(login: PROPS_LOGIN) => {
        const res = await axios.post(`${apiURL}api/login`, login, {
            headers: {
                "Content-Type": "application/json"
            },
        });
        return res.data;
    }
);


export const authSlice = createSlice({
    name: 'login',
    initialState: {
    },
    reducers: {
        
    },
  
    // extraReducer追加
    extraReducers: (builder) => {
      // fetchAsyncLoginメソッドがfulfilledだった場合の処理
      builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
        localStorage.setItem("user_id", action.payload['id']);
      });
    }   
  });