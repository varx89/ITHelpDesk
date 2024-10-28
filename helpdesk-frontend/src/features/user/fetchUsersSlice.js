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

export const fetchUser = createAsyncThunk("user/fetchUser", async (uName, thunkAPI) => {
	try {
		const response = await axios.get(`${API_URL}/api/users/profile/${uName}`);
		return response.data;
	} catch (error) {
		const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

const fetchUsersSlice = createSlice({
	name: "getUsers",
	initialState: {
		getUsers: null,
		success: "",
		error: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.getUsers = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.error = action.payload.error;
				state.success = "";
			});
	},
});

const fetchUserSlice = createSlice({
	name: "getUser",
	initialState: {
		getUser: null,
		success: "",
		error: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder

			.addCase(fetchUser.fulfilled, (state, action) => {
				state.getUser = action.payload;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.error = action.payload.error;
				state.success = "";
			});
	},
});

export const fetchUsersReducer = fetchUsersSlice.reducer;
export const fetchUserReducer = fetchUserSlice.reducer;
