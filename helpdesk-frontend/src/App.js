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
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const Layout = () => {
		return (
			<div className="d-flex flex-column vh-100">
				<Header />

				<main className="flex-grow-1">
					<Outlet />
				</main>

				<Footer />
			</div>
		);
	};
	const LoginWrap = () => {
		return (
			<>
				<Header />
				<Outlet />
			</>
		);
	};

	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginWrap />}>
					<Route path="/" element={<Login />} />
				</Route>
				<Route path="/" element={<Layout />}>
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
