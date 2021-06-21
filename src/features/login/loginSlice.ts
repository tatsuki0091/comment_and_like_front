import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState  } from '../../app/store';
import axios from "axios";
import { PROPS_LOGIN } from "../types"

const apiURL = process.env.REACT_APP_DEV_API_URL;

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
        console.log('iuoui')
        localStorage.setItem("user_id", action.payload['id']);
      });
    }   
  });