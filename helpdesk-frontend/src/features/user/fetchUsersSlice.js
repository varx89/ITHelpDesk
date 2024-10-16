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

// export const fetchDepartments = createAsyncThunk("user/fetchDepartments", async (thunkAPI) => {
// 	try {
// 		const response = await axios.get(`${API_URL}/api/users/fetchDepartments`);
// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		const message = error.response.data || "Invalid 404";
// 		return thunkAPI.rejectWithValue(message);
// 	}
// });

// export const logoutUser = createAsyncThunk("user/logout", async () => {
// 	localStorage.removeItem("user");
// 	localStorage.removeItem("error");
// });

const fetchUserSlice = createSlice({
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

export default fetchUserSlice.reducer;
