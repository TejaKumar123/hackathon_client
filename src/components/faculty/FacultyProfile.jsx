import axios from "axios";
import { useEffect, useState } from "react";
import {
    Email, Person, CalendarToday, Edit,
    School, LocationOn, Phone, LinkedIn,
    Badge, Schedule, Star, Language,
    MenuBook, Groups, Assignment, VerifiedUser
} from "@mui/icons-material";

// Constants
const defaultAvatar = "https://via.placeholder.com/150?text=Profile";

// Dummy Data
const dummyUser = {
    _id: "1234567890",
    username: "tejkumar",
    fullname: "Dr. Teja Kumar",
    email: "tejakumar@example.com",
    role: "Faculty",
    type: "user",
    department: "Computer Science & Engineering",
    designation: "Associate Professor",
    phone: "+91 9876543210",
    location: "Block A, Room 204",
    expertise: ["Machine Learning", "Data Science", "Artificial Intelligence", "Deep Learning", "Neural Networks"],
    education: [
        { degree: "Ph.D. in Computer Science", institution: "IIT Delhi", year: "2015" },
        { degree: "M.Tech in AI", institution: "IIT Bombay", year: "2010" }
    ],
    experience: "10+ years",
    officeHours: "Mon-Fri, 2:00 PM - 4:00 PM",
    linkedin: "linkedin.com/in/tejakumar",
    publications: 25,
    researchProjects: 8,
    awards: [
        "Best Professor Award 2023",
        "Excellence in Research 2022",
        "Outstanding Faculty 2021"
    ],
    courses: [
        "Advanced Machine Learning",
        "Neural Networks",
        "Data Mining",
        "Artificial Intelligence"
    ],
    stats: {
        publications: 25,
        projects: 8,
        students: 45,
        experience: 10
    },
    createdAt: "2024-02-26T12:00:00Z",
    updatedAt: "2024-02-26T12:00:00Z",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg"
};

// Helper Components
const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-500">{icon}</div>
            <div>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    </div>
);

const InfoItem = ({ icon, label, value, isLink = false }) => (
    <div className="flex items-center space-x-3">
        <div className="text-gray-500">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            {isLink ? (
                <a
                    href={`https://${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                >
                    {value}
                </a>
            ) : (
                <p className="text-gray-800">{value}</p>
            )}
        </div>
    </div>
);

// Main Component
const FacultyProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const userId = "1234567890";

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setUser(dummyUser);
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Contact Information</h3>
                            <InfoItem icon={<Email />} label="Email" value={user.email} />
                            <InfoItem icon={<Phone />} label="Phone" value={user.phone} />
                            <InfoItem icon={<LocationOn />} label="Office" value={user.location} />
                            <InfoItem icon={<Schedule />} label="Office Hours" value={user.officeHours} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Education</h3>
                            {user.education.map((edu, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-medium text-gray-800">{edu.degree}</p>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    <p className="text-sm text-gray-500">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'publications':
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Recent Publications</h3>
                        {/* Add publications list here */}
                    </div>
                );
            case 'courses':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.courses.map((course, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                <h4 className="font-medium text-gray-800">{course}</h4>
                            </div>
                        ))}
                    </div>
                );
            case 'awards':
                return (
                    <div className="space-y-4">
                        {user.awards.map((award, index) => (
                            <div key={index} className="flex items-center space-x-3 bg-yellow-50 p-4 rounded-lg">
                                <Star className="text-yellow-500" />
                                <p className="font-medium text-gray-800">{award}</p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
                    <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all">
                        <Edit className="mr-2" /> Edit Cover
                    </button>
                </div>
                <div className="relative px-8 pb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 md:space-x-8">
                        <div className="relative group">
                            <img
                                src={user.profileImg || defaultAvatar}
                                alt="Profile"
                                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Edit className="text-white" />
                            </div>
                        </div>
                        <div className="mt-10 md:mt-0 text-center md:text-left flex-grow">
                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                <h1 className="text-3xl font-bold text-gray-800">{user.fullname}</h1>
                                <VerifiedUser className="text-blue-500" />
                            </div>
                            <p className="text-xl text-gray-600">{user.designation}</p>
                            <p className="text-gray-500">{user.department}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {user.role}
                                </span>
                                <span className="px-4 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                    {user.department}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 flex space-x-3">
                            <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                Contact
                            </button>
                            <button className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                Schedule Meeting
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <StatCard icon={<MenuBook />} label="Publications" value={user.stats.publications} />
                <StatCard icon={<Assignment />} label="Projects" value={user.stats.projects} />
                <StatCard icon={<Groups />} label="Students" value={user.stats.students} />
                <StatCard icon={<Star />} label="Years Experience" value={user.stats.experience} />
            </div>

            {/* Tabs */}
            <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b">
                    <nav className="flex">
                        {['overview', 'publications', 'courses', 'awards'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 text-sm font-medium transition-colors ${
                                    activeTab === tab
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default FacultyProfile;