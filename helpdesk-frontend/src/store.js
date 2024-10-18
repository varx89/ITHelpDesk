import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./features/tickets/ticketSlice";
import departmentReducer from "./features/departments/departmentSlice";
import userReducer from "./features/user/userSlice";
import fetchUsersReducer from "./features/user/fetchUsersSlice";
// import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
	// whitelist: ["user", "error", "success"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		tickets: ticketReducer,
		user: persistedReducer,
		getUsers: fetchUsersReducer,
		departments: departmentReducer,
		// user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			// serializableCheck: {
			// 	ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			// },
		}),
});

export const persistor = persistStore(store);
