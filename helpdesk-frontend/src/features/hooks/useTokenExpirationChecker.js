import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../user/userSlice";

const useTokenExpirationChecker = () => {
	const { user } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const tokenizer = user?.token;

	useEffect(() => {
		if (!tokenizer) {
			dispatch(logout());
			navigate("/login");
			return;
		}

		const decodedToken = jwtDecode(tokenizer);
		const expiryTime = decodedToken.exp * 1000; // Convert expiry time to milliseconds

		const intervalId = setInterval(() => {
			const currentTime = Date.now();

			if (currentTime >= expiryTime) {
				dispatch(logout());
				navigate("/login");
			}
		}, 10000); // Check every 10 seconds

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, [tokenizer, dispatch, navigate]);
};

export default useTokenExpirationChecker;
