import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./components/AdminPanel";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import "./App.css";

function App() {
	const Layout = () => {
		return (
			<>
				<Header />
				<Outlet />
				<Footer />
			</>
		);
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<DashBoard />
							</PrivateRoute>
						}
					/>
					<Route
						path="/admin"
						element={
							<PrivateRoute>
								<AdminPanel />
							</PrivateRoute>
						}
					/>

					<Route path="*" element={<p>There's nothing here: 404!</p>} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
