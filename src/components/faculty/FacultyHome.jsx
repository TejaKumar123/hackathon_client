import { useEffect, useState } from "react";
import axios from "axios";

const FacultyHome = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [events, setEvents] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dummy Data for Fallback
    const dummyAnnouncements = [
        { _id: "1", title: "New Semester Begins", content: "The new semester starts on March 1st!", date: "2024-02-28" },
        { _id: "2", title: "Library Timings", content: "The library will be open 24/7 during exams.", date: "2024-02-27" }
    ];

    const dummyEvents = [
        { _id: "1", title: "Tech Fest 2025", description: "A festival for tech enthusiasts!", date: "2024-03-15" },
        { _id: "2", title: "Entrepreneurship Summit", description: "Meet top startup founders!", date: "2024-03-20" }
    ];

    const dummyClubs = [
        { _id: "1", name: "AI & Robotics Club", description: "Explore AI, ML, and Robotics.", members: 120 },
        { _id: "2", name: "Coding Club", description: "Solve problems and build projects!", members: 85 }
    ];

    const dummyDiscussions = [
        { _id: "1", title: "AI in Education", content: "How can AI transform education?", replies: 24, likes: 15 },
        { _id: "2", title: "Best Internship Platforms?", content: "Where to find good internships?", replies: 18, likes: 12 }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [announcementsRes, eventsRes, clubsRes, discussionsRes] = await Promise.all([
                    axios.get("http://localhost:5000/announcements"),
                    axios.get("http://localhost:5000/events"),
                    axios.get("http://localhost:5000/clubs"),
                    axios.get("http://localhost:5000/discussions")
                ]);

                setAnnouncements(announcementsRes.data.length > 0 ? announcementsRes.data : dummyAnnouncements);
                setEvents(eventsRes.data.length > 0 ? eventsRes.data : dummyEvents);
                setClubs(clubsRes.data.length > 0 ? clubsRes.data : dummyClubs);
                setDiscussions(discussionsRes.data.length > 0 ? discussionsRes.data : dummyDiscussions);
            } catch (error) {
                console.error("Error fetching data:", error);
                setAnnouncements(dummyAnnouncements);
                setEvents(dummyEvents);
                setClubs(dummyClubs);
                setDiscussions(dummyDiscussions);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
                <h1 className="text-4xl font-bold mb-2">Welcome to Your Dashboard</h1>
                <p className="text-blue-100">Here's what's happening in your academic community</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-sm text-blue-100">Classes Today</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-blue-100">Pending Tasks</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-blue-100">New Messages</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-2xl font-bold">2-4 PM</p>
                        <p className="text-sm text-blue-100">Office Hours</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Announcements */}
                <section className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">📢 Recent Announcements</h3>
                            <button className="text-blue-500 hover:text-blue-600">View All</button>
                        </div>
                        <div className="space-y-4">
                            {announcements.map((announcement) => (
                                <div key={announcement._id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                    <h4 className="font-semibold text-gray-800">{announcement.title}</h4>
                                    <p className="text-gray-600 mt-1">{announcement.content}</p>
                                    <p className="text-sm text-gray-500 mt-2">{formatDate(announcement.date)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Events */}
                <section className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">📅 Upcoming Events</h3>
                            <button className="text-blue-500 hover:text-blue-600">View All</button>
                        </div>
                        <div className="space-y-4">
                            {events.map((event) => (
                                <div key={event._id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 rounded-lg p-3 text-center mr-4">
                                            <p className="text-blue-600 font-bold">{formatDate(event.date).split(' ')[0]}</p>
                                            <p className="text-2xl font-bold text-blue-700">{formatDate(event.date).split(' ')[1]}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{event.title}</h4>
                                            <p className="text-gray-600 mt-1">{event.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Clubs */}
                <section className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">🏆 Your Clubs</h3>
                            <button className="text-blue-500 hover:text-blue-600">View All</button>
                        </div>
                        <div className="space-y-4">
                            {clubs.map((club) => (
                                <div key={club._id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{club.name}</h4>
                                            <p className="text-gray-600 mt-1">{club.description}</p>
                                        </div>
                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                            {club.members} members
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Discussions */}
                <section className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">💬 Latest Discussions</h3>
                            <button className="text-blue-500 hover:text-blue-600">View All</button>
                        </div>
                        <div className="space-y-4">
                            {discussions.map((discussion) => (
                                <div key={discussion._id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                    <h4 className="font-semibold text-gray-800">{discussion.title}</h4>
                                    <p className="text-gray-600 mt-1">{discussion.content}</p>
                                    <div className="flex space-x-4 mt-3 text-sm text-gray-500">
                                        <span>💬 {discussion.replies} replies</span>
                                        <span>❤️ {discussion.likes} likes</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FacultyHome;