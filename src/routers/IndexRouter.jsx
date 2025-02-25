import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import NotFound from "../pages/NotFound";
import UserDashboard from "../pages/UserDashboard";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";

const IndexRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route 
                    path="dashboard" 
                    element={
                        <ProtectedRoute>
                            <UserDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer theme="dark" />
        </>
    );
};

export default IndexRouter;