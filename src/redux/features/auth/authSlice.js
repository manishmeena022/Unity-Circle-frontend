import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const url = process.env.REACT_APP_BACKEND_URL;

export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async ({ email, password, username, fullName, gender, phone}, { rejectWithValue}) => {
        try{
            console.log('email', email, 'password', password, 'username', username, 'fullName', fullName)
            const response = await axios({
                method : 'POST',
                url : `${url}/users/register`,
                data : { email, password, username, fullName, gender, phone},
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            console.log('response', response)

            if(response.statusText !== 'Created'){
                toast.error('Invalid credentials')
                return rejectWithValue('Invalid credentials')
            }
            const data = response.data;
            return data

        }catch(error){
            toast.error('Something went wrong')
            return rejectWithValue('Something went wrong')
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try{
            const response = await axios({
                method: 'POST',
                url: `${url}/users/login`,
                data: { email, password },
                headers : {
                    'Content-Type': 'application/json'
                }
            })

            if(response.statusText !== 'OK'){
                toast.error('Invalid credentials')
                return rejectWithValue('Invalid credentials')
            }
            const data = response.data;
        
            localStorage.setItem('accessToken', data.data.accessToken)
            localStorage.setItem('refreshToken', data.data.refreshToken)
            toast.success(data.message)
            return data;
        }catch(error){
        toast.error('Something went wrong')
        return rejectWithValue('Something went wrong')
        }
    }
);

export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${url}/users/profile`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('accessToken', 'refreshToken'),
                },
            });

            console.log('response', response);

            if (response.statusText !== 'OK') {
                return rejectWithValue('Something went wrong')
            }

            const data = response.data;
            return data;
        } catch (error) {
            toast.error(error.message)
            return rejectWithValue('Something went wrong')
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try{
            const response = await axios({
                method : 'POST',
                url : `${url}/users/change-password`,
                data : { oldPassword, newPassword },
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('accessToken', 'refreshToken')
                },
            })

            if(response.statusText !== 'OK'){
                toast.error('Invalid credentials')
                return rejectWithValue('Invalid credentials')
            }

            const data = response.data;
            toast.success(data.message)
            return data;
        }catch(error){
            toast.error('Something went wrong')
            return rejectWithValue('Something went wrong')
        }
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : {},
        accessToken : '',
        refreshToken : '',
        loading : false,
        error : null
    },
    reducers : {
        logout : (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            toast.success('Logged out successfully')
        }
    },
    extraReducers : (builder) => {
        builder 
            //Register cases
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Fetch Profile cases
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //Change Password cases
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;