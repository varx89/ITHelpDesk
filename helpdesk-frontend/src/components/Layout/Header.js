import React, { useEffect } from "react";
import SIGLA from "../../assets/images/SIGLA2021_no_bg.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/user/userSlice";
import useTypewriter from "../../features/hooks/useTypewriter";

const Header = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutUser = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<>
			<header id="header" className="border-bottom border-1">
				<nav className="navbar navbar-expand-sm navbar-light bg-body-tertiary">
					<div className="container-fluid">
						<a className="navbar-brand" href="#">
							<img src={SIGLA} className="img-thumbnail resize-img-nav" alt="Portal" />
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav d-flex justify-content-between flex-nowrap w-100 align-items-center">
								<li className="nav-item d-flex justify-content-between flex-wrap align-items-center fs-5">
									<span className="color-header-title">
										<i className="fa-brands fa-windows"></i>
									</span>
									<a className="nav-link color-header-title fw-bold share-tech-mono-regular" aria-current="page" href="#">
										{useTypewriter("CAA - IT Portal ", 500)}
									</a>
								</li>

								<li className="nav-item dropdown d-flex flex-wrap">
									{user?.token && (
										<>
											<div className="text-center d-flex flex-wrap justify-content-center align-items-center">
												<span className="fw-bold text-info-emphasis">
													{user && user?.role === "admin" ? (
														<span className="pe-1">
															<i class="fa-solid fa-star fa-xs text-warning"></i>
														</span>
													) : (
														""
													)}
													{user?.fullName}
												</span>
											</div>
											<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
												<img
													src={`https://ui-avatars.com/api/?name=${user?.fullName}&background=0D8ABC&color=fff`}
													className="rounded-circle resize-img-nav-profile"
													alt="Profil"
												/>
											</a>
											<ul className="dropdown-menu dropdown-menu-end">
												<li>
													<span className="dropdown-item cursor-pointer" onClick={() => navigate("/admin")}>
														<i class="fa-solid fa-fingerprint fa-xs"></i> Administrator
													</span>
												</li>
												<hr className="dropdown-divider" />
												<li>
													<span className="dropdown-item cursor-pointer" onClick={() => navigate("/dashboard")}>
														<i class="fa-solid fa-list-ul fa-xs"></i> Contul meu
													</span>
												</li>
												{/* <li>
													<span className="dropdown-item">
														<i className="fa-solid fa-user"></i> Profil
													</span>
												</li>
												<li>
													<span className="dropdown-item">
														<i className="fa-solid fa-gear"></i> Setări
													</span>
												</li> */}
												<li>
													<hr className="dropdown-divider" />
												</li>
												<li>
													<a onClick={logoutUser} className="dropdown-item" href="#">
														<i className="fa-solid fa-right-from-bracket fa-xs"></i> Ieșire
													</a>
												</li>
											</ul>
										</>
									)}
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Header;
