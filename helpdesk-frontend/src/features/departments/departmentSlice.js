import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const tokenAuthorization = (thunk) => {
	const token = thunk.getState().user.user.token;
	return {
		headers: { Authorization: `Bearer ${token}` },
	};
};

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
export const filterDepartment = createAsyncThunk("department/getDepartments", async (id, thunkAPI) => {
	if (id) {
		try {
			const response = await axios.get(`${API_URL}/api/departments/getDepartments/${id}`, {}, tokenAuthorization(thunkAPI));
			return response.data;
		} catch (error) {
			const message = error.response.data || "Invalid 404";
			return thunkAPI.rejectWithValue(message);
		}
	}
});

const departmentSlice = createSlice({
	name: "departments",
	initialState: {
		departments: "",
		success: "",
		error: "",
		filter: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDepartments.fulfilled, (state, action) => {
				state.departments = action.payload;
			})
			.addCase(fetchDepartments.rejected, (state, action) => {
				state.error = action.payload;
				state.success = "";
			})
			.addCase(filterDepartment.fulfilled, (state, action) => {
				state.filter = action.payload;
				state.success = "";
			})
			.addCase(filterDepartment.rejected, (state, action) => {
				state.error = action.payload.error;
				state.success = "";
			});
	},
});

export default departmentSlice.reducer;
