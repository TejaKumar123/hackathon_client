import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
    AccountCircle, Logout, Group, Event, School,
    Campaign, Forum, Work
} from "@mui/icons-material";
import { setUser } from "../../store/slices/userReducer";

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user); // Fetch user from Redux
    const [cookies, setCookie, removeCookie] = useCookies(["hackathon_token"]);

    const handleLogout = () => {
        removeCookie("hackathon_token", { path: "/" }); // Remove token from cookies
        navigate("/login");
        dispatch(setUser(false));

    };


    return (
        <div className="w-64 h-scree bg-gray-900 text-white p-5 overflow-auto">
            <div className="flex items-center space-x-3 mb-6">
                <img
                    src={user?.profilePic || "https://picsum.photos/seed/picsum/200/300"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-white"
                />
                <div>
                    <h3 className="text-lg font-semibold">Welcome {user?.name || "User"}</h3>
                    <p className="text-sm text-gray-400">{user?.role || "Admin"}</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            <nav className="space-y-3">
                <NavLink to="" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Home</NavLink>
                <NavLink to="profile" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Profile</NavLink>
                {/* <NavLink to="settings" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Settings</NavLink> */}
                <NavLink to="clubs" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Clubs</NavLink>
                <NavLink to="events" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Events</NavLink>
                <NavLink to="alumni" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Alumni</NavLink>
                <NavLink to="announcements" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Announcements</NavLink>
                <NavLink to="discussions" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Discussions</NavLink>
                <NavLink to="opportunities" className={({ isActive }) => isActive ? "block p-3 bg-gray-700 rounded" : "block p-3 hover:bg-gray-700 rounded"}>Opportunities</NavLink>
            </nav>
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    <Logout className="mr-2" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
