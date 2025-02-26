import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
    AccountCircle, Logout, Event, School,
    Campaign, Forum, Home, Person,
    Settings, NotificationsActive
} from "@mui/icons-material";
import { setUser } from "../../store/slices/userReducer";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const [cookies, setCookie, removeCookie] = useCookies(["hackathon_token"]);

    const menuItems = [
        { path: "", icon: <Home />, label: "Home" },
        { path: "profile", icon: <Person />, label: "Profile" },
        { path: "events", icon: <Event />, label: "Events" },
        { path: "announcements", icon: <Campaign />, label: "Announcements" },
        { path: "discussions", icon: <Forum />, label: "Discussions" },
    ];

    const handleLogout = () => {
        removeCookie("hackathon_token", { path: "/" });
        navigate("/login");
        dispatch(setUser(false));
    };

    return (
        <div className="w-64 h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            {/* Profile Section */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <img
                            src={user?.profilePic || "https://picsum.photos/seed/picsum/200/300"}
                            alt="Profile"
                            className="w-14 h-14 rounded-full border-2 border-blue-400 p-0.5 transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">
                            Welcome, {user?.name?.split(' ')[0] || "User"}
                        </h3>
                        <div className="flex items-center text-sm text-gray-300">
                            <School className="w-4 h-4 mr-1" />
                            <span>{user?.role || "Faculty"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Title */}
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold flex items-center">
                    <NotificationsActive className="mr-2 text-blue-400" />
                    Faculty Dashboard
                </h2>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`
                            }
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* Settings & Logout Section */}
            <div className="p-4 border-t border-gray-700">
                <NavLink
                    to="settings"
                    className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                            isActive
                                ? "bg-gray-700 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`
                    }
                >
                    <Settings />
                    <span>Settings</span>
                </NavLink>
                
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
                >
                    <Logout />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;