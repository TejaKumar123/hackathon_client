import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
    AccountCircle, Logout, Group, Event, School,
    Campaign, Forum, Work, Home, Person
} from "@mui/icons-material";
import { setUser } from "../../store/slices/userReducer";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const [cookies, setCookie, removeCookie] = useCookies(["hackathon_token"]);

    const handleLogout = () => {
        removeCookie("hackathon_token", { path: "/" });
        navigate("/login");
        dispatch(setUser(false));
    };

    const menuItems = [
        { path: "", icon: <Home />, label: "Home" },
        { path: "profile", icon: <Person />, label: "Profile" },
        { path: "clubs", icon: <Group />, label: "Clubs" },
        { path: "events", icon: <Event />, label: "Events" },
        { path: "alumni", icon: <School />, label: "Alumni" },
        { path: "announcements", icon: <Campaign />, label: "Announcements" },
        { path: "discussions", icon: <Forum />, label: "Discussions" },
        { path: "opportunities", icon: <Work />, label: "Opportunities" },
    ];

    return (
        <div className="w-64 h-screen flex flex-col bg-gray-900 text-white">
            {/* Profile Section */}
            <div className="p-5 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <img
                            src={user?.profilePic || "https://picsum.photos/seed/picsum/200/300"}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border-2 border-blue-500"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Welcome {user?.name || "User"}</h3>
                        <p className="text-sm text-gray-400">{user?.role || "Student"}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 overflow-y-auto">
                <h2 className="text-xl font-bold px-5 py-4">Student Dashboard</h2>
                <nav className="px-3">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 mb-1 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`
                            }
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Logout Section */}
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
                >
                    <Logout />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;