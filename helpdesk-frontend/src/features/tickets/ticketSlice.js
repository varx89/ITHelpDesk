import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const createTicket = createAsyncThunk("tickets/create", async (ticketData, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token;
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const response = await axios.post(`${API_URL}/api/tickets/create`, ticketData, config);
	return response.data;
});

export const getAllTickets = createAsyncThunk("tickets/getAll", async (_, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token;
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const response = await axios.get(`${API_URL}/api/tickets`, config);
	return response.data;
});

export const takeTicket = createAsyncThunk("tickets/take", async (id, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token;
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const response = await axios.put(`${API_URL}/api/tickets/take/${id}`, {}, config);
	return response.data;
});

export const closeTicket = createAsyncThunk("tickets/close", async ({ id, solvingRemark }, thunkAPI) => {
	const token = thunkAPI.getState().user.user.token;
	const config = {
		headers: { Authorization: `Bearer ${token}` },
	};
	const response = await axios.put(`${API_URL}/api/tickets/close/${id}`, { solvingRemark }, config);
	return response.data;
});

const ticketSlice = createSlice({
	name: "tickets",
	initialState: {
		tickets: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllTickets.fulfilled, (state, action) => {
				state.tickets = action.payload;
			})
			.addCase(takeTicket.fulfilled, (state, action) => {
				state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload.id);
			})
			.addCase(closeTicket.fulfilled, (state, action) => {
				const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
				state.tickets[index] = action.payload;
			});
	},
});

export default ticketSlice.reducer;
