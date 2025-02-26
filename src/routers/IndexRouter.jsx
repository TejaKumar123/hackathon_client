import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import NotFound from "../pages/NotFound";
//import UserDashboard from "../pages/UserDashboard";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import FacultyDashboard from "../pages/FacultyDashboard";
import AlumniDashboard from "../pages/AlumniDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ClubCoordinatorDashboard from "../pages/ClubCoordinatorDashboard";

import StudentDashboard from "../pages/StudentDashboard";
import StudentHome from "../components/student/StudentHome";
import Profile from "../components/student/Profile";
//import Settings from "../components/student/Settings";
import Clubs from "../components/student/Clubs";
import Events from "../components/student/Events";
import Alumni from "../components/student/Alumni";
import Announcements from "../components/student/Announcements";
import Discussions from "../components/student/Discussions";
import Opportunities from "../components/student/Opportunities";


const IndexRouter = () => {
    const { user } = useSelector(state => state.user);
    const [cookies] = useCookies();

    return (
        <>
            <Routes>

                {(!cookies.hackthon_token && !user) && (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </>
                )}


                {cookies.hackathon_token && user?.role == "student" && (
                    <Route path="/" element={<StudentDashboard />}>
                        <Route path="" element={<StudentHome />} />
                        <Route path="profile" element={<Profile />} />
                        {/* <Route path="settings" element={<Settings />} /> */}
                        <Route path="clubs" element={<Clubs />} />
                        <Route path="events" element={<Events />} />
                        <Route path="alumni" element={<Alumni />} />
                        <Route path="announcements" element={<Announcements />} />
                        <Route path="discussions" element={<Discussions />} />
                        <Route path="opportunities" element={<Opportunities />} />
                    </Route>
                )}


                {cookies.hackthon_token && user?.role === "faculty" && (
                    <Route path="/" element={<FacultyDashboard />} />
                )}

                {cookies.hackthon_token && user?.role === "alumni" && (
                    <Route path="/" element={<AlumniDashboard />} />
                )}

                {cookies.hackthon_token && user?.role === "admin" && (
                    <Route path="/" element={<AdminDashboard />} />
                )}

                {cookies.hackthon_token && user?.role === "club_coordinator" && (
                    <Route path="/" element={<ClubCoordinatorDashboard />} />
                )}


                <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer theme="dark" />
        </>
    );
};

export default IndexRouter;