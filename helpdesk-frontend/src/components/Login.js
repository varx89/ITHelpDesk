import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import LoginIMG from "../assets/images/loginAI.svg";

const Login = () => {
	const [formData, setFormData] = useState({ username: "", password: "" });
	const { username, password } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, error, success } = useSelector((state) => state.user);

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
		<>
			<section className="h-100">
				<div className="container py-4 h-100">
					<div className="row d-flex align-items-center justify-content-center h-100">
						<div className="col-md-8 col-lg-7 col-xl-6">
							<img src={LoginIMG} className="img-fluid opacity-75 h-80" alt="Login image" />
						</div>
						<div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
							{error && (
								<strong>
									<div className="alert alert-danger">{error}</div>
								</strong>
							)}
							{success && (
								<strong>
									<div className="alert alert-success">{success}</div>
								</strong>
							)}
							<form onSubmit={onSubmit}>
								<div data-mdb-input-init className="form-outline mb-4">
									<label className="form-label" htmlFor="username">
										Utilizator/Nr. Marca
									</label>
									<input type="text" name="username" value={username} onChange={onChange} className="form-control form-control-lg" required />
								</div>

								<div data-mdb-input-init className="form-outline mb-4">
									<label className="form-label" htmlFor="password">
										Parola
									</label>
									<input type="password" name="password" value={password} onChange={onChange} className="form-control form-control-lg" />
								</div>

								<div className="d-flex align-items-start mb-4">
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="form1Example3" defaultChecked />
										<label className="form-check-label" htmlFor="form1Example3">
											{" "}
											Tine-ma minte!{" "}
										</label>
									</div>
								</div>

								<button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block w-100">
									LOGARE
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
