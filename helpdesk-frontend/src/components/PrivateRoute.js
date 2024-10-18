import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useTokenExpirationChecker from "../features/hooks/useTokenExpirationChecker";

const PrivateRoute = ({ children }) => {
	const { user } = useSelector((state) => state.user);

	useTokenExpirationChecker();

	return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
