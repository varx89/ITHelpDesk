import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
	const response = await axios.get(`${API_URL}/api/users/fetchUsers`);
	return response.data;
});

export const registerUser = createAsyncThunk("user/register", async (userData) => {
	const response = await axios.post(`${API_URL}/api/users/register`, userData);
	return response.data;
});

export const loginUser = createAsyncThunk("user/login", async (userData) => {
	const response = await axios.post(`${API_URL}/api/users/login`, userData);
	return response.data;
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
	localStorage.removeItem("user");
	localStorage.removeItem("error");
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = "Invalid username or password";
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.user = null;
			});
	},
});

export default userSlice.reducer;
