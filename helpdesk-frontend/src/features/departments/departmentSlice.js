import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchDepartments = createAsyncThunk("department/fetchDepartments", async (thunkAPI) => {
	try {
		const response = await axios.get(`${API_URL}/api/departments/fetchDepartments`);
		return response.data;
	} catch (error) {
		const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

const departmentSlice = createSlice({
	name: "departments",
	initialState: {
		departments: "",
		success: "",
		error: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDepartments.fulfilled, (state, action) => {
				state.departments = action.payload;
				console.log("state.departments", state.departments);
			})
			.addCase(fetchDepartments.rejected, (state, action) => {
				state.error = action.payload.error;
				state.success = "";
			});
	},
});

export default departmentSlice.reducer;
