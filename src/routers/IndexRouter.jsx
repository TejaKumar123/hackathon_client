import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../components/login/Login";
import NotFound from "../pages/NotFound";
import Signup from "../components/signup/Signup";
import { ToastContainer } from "react-toastify";

const IndexRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer theme="dark" />
		</>
	)
}

export default IndexRouter;