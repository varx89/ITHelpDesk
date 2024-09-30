import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [formData, setFormData] = useState({ username: "", password: "", fullName: "", role: "normal" });
	const { username, password, fullName, role } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, error } = useSelector((state) => state.user);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(registerUser({ username, password, fullName, role }));
	};

	if (user) {
		navigate("/dashboard");
	}

	return (
		<div>
			<h1>Register</h1>
			{error && <p>{error}</p>}
			<form onSubmit={onSubmit}>
				<input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
				<input type="text" name="fullName" value={fullName} onChange={onChange} placeholder="Full Name" required />
				<input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
