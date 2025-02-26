import React, { useEffect, useState } from "react";
import axios from "axios";

// Dummy data for testing
const dummyClubs = [
    { _id: "1", name: "AI & Robotics Club", description: "Explore AI, ML, and Robotics.", members: 120 },
    { _id: "2", name: "Coding Club", description: "Solve problems and build projects!", members: 85 },
    { _id: "3", name: "Music Club", description: "Showcase your musical talents.", members: 95 },
    { _id: "4", name: "Drama Club", description: "Act, direct, and write plays.", members: 60 },
    { _id: "5", name: "Photography Club", description: "Capture stunning moments.", members: 75 },
    { _id: "6", name: "Eco Club", description: "Work towards a sustainable future.", members: 45 },
    { _id: "7", name: "Entrepreneurship Club", description: "Learn how to build startups.", members: 110 },
    { _id: "8", name: "Sports Club", description: "Engage in various sports activities.", members: 150 },
    { _id: "9", name: "Debate Society", description: "Sharpen your argumentation skills.", members: 55 },
    { _id: "10", name: "Film & Animation Club", description: "Create short films and animations.", members: 70 }
];

const Clubs = () => {
    const [clubs, setClubs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [joinedClubs, setJoinedClubs] = useState({});

    // Fetch clubs on component mount
    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        setLoading(true);
        try {
            // Replace with your actual API endpoint
            // const response = await axios.get('your-api-endpoint');
            // setClubs(response.data);
            
            // Using dummy data for demonstration
            setTimeout(() => {
                setClubs(dummyClubs);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error fetching clubs:", error);
            setClubs(dummyClubs);
            setLoading(false);
        }
    };

    // Handle club join/leave
    const handleJoinClub = (clubId) => {
        setJoinedClubs(prev => ({
            ...prev,
            [clubId]: !prev[clubId]
        }));
    };

    // Filter clubs based on search term
    const filteredClubs = clubs.filter(club => 
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Available Clubs
                    </h1>
                    
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search clubs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        {/* No Results */}
                        {filteredClubs.length === 0 ? (
                            <div className="text-center py-12">
                                <h2 className="text-xl text-gray-600">No clubs found</h2>
                                <p className="text-gray-400 mt-2">Try different search terms</p>
                            </div>
                        ) : (
                            /* Clubs Grid */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredClubs.map((club) => (
                                    <div
                                        key={club._id}
                                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                {club.name}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {club.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <button
                                                    onClick={() => handleJoinClub(club._id)}
                                                    className={`
                                                        px-6 py-2 rounded-lg font-medium transition-all duration-200
                                                        ${joinedClubs[club._id]
                                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                                        }
                                                    `}
                                                >
                                                    {joinedClubs[club._id] ? 'Joined' : 'Join Club'}
                                                </button>
                                                <span className="text-sm text-gray-500">
                                                    {club.members} members
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Clubs;