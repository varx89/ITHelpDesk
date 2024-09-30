import React from "react";

const Footer = () => {
	return (
		<>
			<footer className="py-3 bg-white mb-0">
				<ul className="nav justify-content-center border-bottom pb-3 mb-3">
					<li className="nav-item">
						<a href="https://getbootstrap.com/" className="nav-link px-2 text-body-secondary">
							Realizat cu
						</a>
					</li>
					<li className="nav-item">
						<a href="https://getbootstrap.com/" className="nav-link px-2 text-body-secondary">
							<i className="fa-brands fa-bootstrap"></i>
						</a>
					</li>
					<li className="nav-item">
						<a href="https://nodejs.org/en" className="nav-link px-2 text-body-secondary">
							<i className="fa-brands fa-node"></i>
						</a>
					</li>
					<li className="nav-item">
						<a href="https://react.dev/" className="nav-link px-2 text-body-secondary">
							<i className="fa-brands fa-react"></i>
						</a>
					</li>
				</ul>
				<p className="text-center text-body-secondary">&copy; 2024 Compania de Apa Arad S.A.</p>
			</footer>
		</>
	);
};

export default Footer;
