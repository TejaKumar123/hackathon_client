import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Edit, Email, Person, CalendarToday, Badge } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultAvatar = "https://via.placeholder.com/150?text=Profile";

const AlumniProfile = () => {
    const [loading, setLoading] = useState(true);
    
    // Get user from Redux store
    const {user} = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.post("http://localhost:5000/auth/getUserData", {
                    criteria: { _id: user._id },
                    projection: {
                        username: 1,
                        fullname: 1,
                        email: 1,
                        role: 1,
                        type: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        profileImg: 1
                    }
                });

                if (response.data.status === "ok") {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Error fetching user profile!");
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchUserProfile();
        }
    }, [user?._id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Profile Card */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Cover Photo */}
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                {/* Profile Info */}
                <div className="relative px-6 pb-6">
                    {/* Profile Picture */}
                    <div className="absolute -top-16 left-6">
                        <div className="relative group">
                            <img
                                src={user.profileImg || "https://picsum.photos/seed/picsum/200/300"}
                                alt="User Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                            />
                            <button className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Edit fontSize="small" />
                            </button>
                        </div>
                    </div>

                    {/* Edit Profile Button */}
                    <div className="text-right pt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2 ml-auto">
                            <Edit fontSize="small" />
                            <span>Edit Profile</span>
                        </button>
                    </div>

                    {/* User Details */}
                    <div className="mt-8">
                        <h2 className="text-3xl font-bold text-gray-800">{user.fullname}</h2>
                        <p className="text-gray-600 text-lg">@{user.username}</p>
                        
                        {/* Role Badge */}
                        <span className="inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            {user.role.toUpperCase()}
                        </span>

                        {/* Additional Info */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={<Email />} label="Email" value={user.email} />
                            <InfoItem icon={<Person />} label="Username" value={user.username} />
                            <InfoItem icon={<Badge />} label="Account Type" value={user.type} />
                            <InfoItem 
                                icon={<CalendarToday />} 
                                label="Joined" 
                                value={formatDate(user.createdAt)} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <StatCard title="Last Updated" value={formatDate(user.updatedAt)} />
                <StatCard title="Role" value={user.role} />
            </div>
        </div>
    );
};

// Helper Components
const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
        <div className="text-blue-500">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-gray-800 font-medium">{value}</p>
        </div>
    </div>
);

const StatCard = ({ title, value }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
);

export default AlumniProfile;