import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const { username, password } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, error, message } = useSelector((state) => state.user);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser({ username, password }));
	};

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, [user, navigate]);

	return (
		<div>
			<h1>Login</h1>
			{message && <p>{message}</p>}
			{error && <p>{error}</p>}

			<form onSubmit={onSubmit}>
				<input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
				<input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
