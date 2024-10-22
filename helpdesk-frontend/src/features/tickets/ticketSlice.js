import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const tokenAuthorization = (thunk) => {
	const token = thunk.getState().user.user.token;
	return {
		headers: { Authorization: `Bearer ${token}` },
	};
};

export const createTicket = createAsyncThunk("tickets/create", async (ticketData, thunkAPI) => {
	console.log(ticketData);
	try {
		const response = await axios.post(`${API_URL}/api/tickets/create`, ticketData, tokenAuthorization(thunkAPI));
		return response.data;
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.error) || error.message || "Invalid 404";
		// const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

export const getAllTickets = createAsyncThunk("tickets/getAll", async (_, thunkAPI) => {
	try {
		const response = await axios.get(`${API_URL}/api/tickets`, tokenAuthorization(thunkAPI));
		return response.data;
	} catch (error) {
		const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

export const takeTicket = createAsyncThunk("tickets/take", async (id, thunkAPI) => {
	try {
		const response = await axios.put(`${API_URL}/api/tickets/take/${id}`, {}, tokenAuthorization(thunkAPI));
		return response.data;
	} catch (error) {
		const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

export const closeTicket = createAsyncThunk("tickets/close", async ({ id, solvingRemark, timeSpan }, thunkAPI) => {
	try {
		const response = await axios.put(`${API_URL}/api/tickets/close/${id}`, { id, solvingRemark, timeSpan }, tokenAuthorization(thunkAPI));
		return response.data;
	} catch (error) {
		const message = error.response.data || "Invalid 404";
		return thunkAPI.rejectWithValue(message);
	}
});

const ticketSlice = createSlice({
	name: "tickets",
	initialState: {
		tickets: [],
		error: "",
		success: "",
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllTickets.fulfilled, (state, action) => {
				state.tickets = action.payload;
			})

			.addCase(createTicket.fulfilled, (state, action) => {
				state.error = "";
				state.success = "Ticket Adaugat cu success!";
				state.tickets.push(action.payload);
			})
			.addCase(createTicket.rejected, (state, action) => {
				state.error = action.payload;
				state.success = "";
			})

			.addCase(takeTicket.fulfilled, (state, action) => {
				state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload.id);
			})

			.addCase(closeTicket.fulfilled, (state, action) => {
				const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
				if (index !== -1) {
					state.tickets[index] = action.payload;
					state.error = "";
					state.success = "Ticket inchis cu success!";
				}
			})
			.addCase(closeTicket.rejected, (state, action) => {
				const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);

				if (index !== -1) {
					state.tickets[index] = action.payload;
					state.error = action.payload.error;
				}
				state.error = action.payload.error;
				state.success = "";
			});
	},
});

export default ticketSlice.reducer;
