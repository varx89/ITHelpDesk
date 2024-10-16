import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (thunkAPI) => {
	try {
		const response = await axios.get(`${API_URL}/api/users/fetchUsers`);
		return response.data;
	} catch (error) {
		const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

export const registerUser = createAsyncThunk("user/register", async (userData, thunkAPI) => {
	try {
		const response = await axios.post(`${API_URL}/api/users/register`, userData);
		return response.data;
	} catch (error) {
		const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

export const loginUser = createAsyncThunk("user/login", async (userData, thunkAPI) => {
	try {
		const response = await axios.post(`${API_URL}/api/users/login`, userData);
		return response.data;
	} catch (error) {
		const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		success: "",
		error: "",
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			state.success = "";
			state.error = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.fulfilled, (state, action) => {
				state.message = action.payload.success;
				state.success = "Utilizator inregistrat cu success!";
				state.error = "";
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.error.success;
				state.success = "";
			})

			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.success = "Utilizator logat cu success";
				state.error = "";
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload.error;
				state.success = "";
			});
	},
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
