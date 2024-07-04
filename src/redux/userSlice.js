import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosInstance";

const initialState = {
    banner:'',
    users:null,
    loading:false,
    error:null,
    editUser:null
};

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async () => {
      return await axiosInstance.get('users').then(response => response.data);
    }
  );

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        bannerAction: (state, action) => {
            state.banner = action.payload
        },
        addAllUsers: (state, action) => {
            state.users = action.payload
        },
        addEditUser: (state, action) => {
            state.editUser = action.payload
        }
        // editUser: (state, action) => {
        //     const item = state.users.find((x) => x.id === action.payload)
        //     state.users = [...state.users.slice(0, action.payload), ...state.users.slice(action.payload + 1)]
        // }
    },

    extraReducers: (builder) => {
        builder
          .addCase(getAllUsers.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
          .addCase(getAllUsers.rejected, (state, action) => {
            state.loading=false;
            state.error = action.error.message;
          });
      }

});
export default userSlice.reducer;
export const { bannerAction, addAllUsers, addEditUser } = userSlice.actions;