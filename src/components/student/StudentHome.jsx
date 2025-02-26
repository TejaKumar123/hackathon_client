import { useEffect, useState } from "react";
import axios from "axios";
import { 
    Announcement, Event, Group, Forum, 
    ArrowForward, CalendarToday, People, Message 
} from "@mui/icons-material";

const StudentHome = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [events, setEvents] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dummy Data
	const dummyAnnouncements = [
		{
			_id: "1",
			title: "New Semester Registration Open",
			content: "Registration for Spring 2024 begins next week. Please check your email for details.",
			date: "2024-02-28",
			time: "2 hours ago"
		},
		{
			_id: "2",
			title: "Library Extended Hours",
			content: "Library will remain open 24/7 during the final examination period.",
			date: "2024-02-27",
			time: "1 day ago"
		},
		{
			_id: "3",
			title: "Guest Lecture on AI",
			content: "Dr. John Smith will be delivering a lecture on the future of AI.",
			date: "2024-03-01",
			time: "3 days ago"
		},
		{
			_id: "4",
			title: "Hackathon Registrations Open",
			content: "Sign up for the upcoming university-wide hackathon.",
			date: "2024-03-05",
			time: "5 days ago"
		},
		{
			_id: "5",
			title: "Scholarship Applications",
			content: "Apply for merit-based scholarships before the deadline.",
			date: "2024-03-10",
			time: "1 week ago"
		},
		{
			_id: "6",
			title: "Sports Meet 2024",
			content: "Annual sports meet schedule has been announced.",
			date: "2024-03-12",
			time: "2 weeks ago"
		},
		{
			_id: "7",
			title: "New Course: Cybersecurity Basics",
			content: "Enroll in the newly introduced Cybersecurity course.",
			date: "2024-03-15",
			time: "3 weeks ago"
		},
		{
			_id: "8",
			title: "Blood Donation Camp",
			content: "Join us in saving lives by donating blood this Friday.",
			date: "2024-03-20",
			time: "4 weeks ago"
		},
		{
			_id: "9",
			title: "Placement Training Program",
			content: "Attend workshops to improve interview skills and resume building.",
			date: "2024-03-22",
			time: "1 month ago"
		},
		{
			_id: "10",
			title: "Alumni Meet 2024",
			content: "Reconnect with alumni at the annual alumni meet.",
			date: "2024-03-25",
			time: "1 month ago"
		}
	];
	
	const dummyEvents = [
		{
			_id: "1",
			title: "Annual Tech Symposium",
			description: "Join us for the biggest tech event of the year!",
			date: "2024-03-15",
			location: "Main Auditorium"
		},
		{
			_id: "2",
			title: "Career Fair 2024",
			description: "Meet recruiters from top companies.",
			date: "2024-03-20",
			location: "Campus Ground"
		},
		{
			_id: "3",
			title: "AI & ML Conference",
			description: "A deep dive into the latest advancements in AI & ML.",
			date: "2024-03-25",
			location: "Innovation Hall"
		},
		{
			_id: "4",
			title: "Entrepreneurship Workshop",
			description: "Learn how to turn your ideas into a successful startup.",
			date: "2024-03-28",
			location: "Business Center"
		},
		{
			_id: "5",
			title: "Cybersecurity Bootcamp",
			description: "Hands-on training on cybersecurity and ethical hacking.",
			date: "2024-04-02",
			location: "IT Lab"
		},
		{
			_id: "6",
			title: "Robotics Exhibition",
			description: "Showcase of the latest projects in robotics.",
			date: "2024-04-07",
			location: "Engineering Block"
		},
		{
			_id: "7",
			title: "Music Fest 2024",
			description: "A celebration of music and art by student performers.",
			date: "2024-04-12",
			location: "Open Air Theatre"
		},
		{
			_id: "8",
			title: "National Coding Contest",
			description: "Compete with the best coders in the country.",
			date: "2024-04-18",
			location: "Computer Science Building"
		},
		{
			_id: "9",
			title: "Mathematics Olympiad",
			description: "Challenge your problem-solving skills in this prestigious event.",
			date: "2024-04-22",
			location: "Math Department"
		},
		{
			_id: "10",
			title: "Environmental Awareness Drive",
			description: "A campaign to promote sustainability and eco-friendly practices.",
			date: "2024-04-30",
			location: "Campus Green Zone"
		}
	];
	
	const dummyClubs = [
		{
			_id: "1",
			name: "Coding Club",
			description: "Learn, code, and build amazing projects together.",
			members: 156,
			category: "Technology"
		},
		{
			_id: "2",
			name: "Robotics Society",
			description: "Explore the world of robotics and automation.",
			members: 89,
			category: "Engineering"
		},
		{
			_id: "3",
			name: "AI & ML Club",
			description: "Delve into artificial intelligence and machine learning.",
			members: 120,
			category: "Technology"
		},
		{
			_id: "4",
			name: "Cybersecurity Club",
			description: "Learn ethical hacking and cybersecurity techniques.",
			members: 75,
			category: "Security"
		},
		{
			_id: "5",
			name: "Photography Club",
			description: "Capture moments and tell stories through pictures.",
			members: 110,
			category: "Arts"
		},
		{
			_id: "6",
			name: "Music Club",
			description: "A community for music lovers and aspiring musicians.",
			members: 95,
			category: "Arts"
		},
		{
			_id: "7",
			name: "Entrepreneurship Cell",
			description: "Encouraging students to develop entrepreneurial skills.",
			members: 80,
			category: "Business"
		},
		{
			_id: "8",
			name: "Gaming Club",
			description: "For those passionate about eSports and game development.",
			members: 130,
			category: "Technology"
		},
		{
			_id: "9",
			name: "Literary Society",
			description: "Fostering a love for literature and creative writing.",
			members: 140,
			category: "Education"
		},
		{
			_id: "10",
			name: "Environmental Club",
			description: "Promoting sustainability and green initiatives.",
			members: 90,
			category: "Social"
		}
	];
	
	const dummyDiscussions = [
		{
			_id: "1",
			title: "Internship Experiences 2024",
			content: "Share your summer internship experiences and tips.",
			replies: 23,
			author: "John Doe"
		},
		{
			_id: "2",
			title: "Project Collaboration",
			content: "Looking for team members for the upcoming hackathon.",
			replies: 15,
			author: "Jane Smith"
		},
		{
			_id: "3",
			title: "AI and Ethics",
			content: "Discuss the ethical implications of AI advancements.",
			replies: 12,
			author: "Robert Brown"
		},
		{
			_id: "4",
			title: "Remote Work Opportunities",
			content: "Share remote job openings for freshers.",
			replies: 18,
			author: "Emily Johnson"
		},
		{
			_id: "5",
			title: "Cybersecurity Trends",
			content: "Latest threats and security measures in the industry.",
			replies: 22,
			author: "Michael Lee"
		},
		{
			_id: "6",
			title: "Best Coding Practices",
			content: "Tips to write clean and efficient code.",
			replies: 30,
			author: "Alice White"
		}
	];
	

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white shadow-lg">
                <h2 className="text-3xl font-bold mb-2">Welcome to Your Student Dashboard</h2>
                <p className="text-blue-100 text-lg">Track your academic journey and stay connected</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <QuickStat 
                    icon={<Announcement className="text-red-500" />}
                    title="Announcements" 
                    count={announcements.length} 
                    color="bg-red-50" 
                    textColor="text-red-600"
                />
                <QuickStat 
                    icon={<Event className="text-green-500" />}
                    title="Events" 
                    count={events.length} 
                    color="bg-green-50" 
                    textColor="text-green-600"
                />
                <QuickStat 
                    icon={<Group className="text-blue-500" />}
                    title="Clubs" 
                    count={clubs.length} 
                    color="bg-blue-50" 
                    textColor="text-blue-600"
                />
                <QuickStat 
                    icon={<Forum className="text-purple-500" />}
                    title="Discussions" 
                    count={discussions.length} 
                    color="bg-purple-50" 
                    textColor="text-purple-600"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Announcements Section */}
                <DashboardCard
                    title="Recent Announcements"
                    icon={<Announcement />}
                    headerColor="bg-red-50"
                    textColor="text-red-600"
                    data={announcements}
                    renderItem={(item) => (
                        <div key={item._id} className="mb-4 last:mb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 mt-1">{item.content}</p>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <CalendarToday className="w-4 h-4 mr-1" />
                                <span>{item.time}</span>
                            </div>
                        </div>
                    )}
                />

                {/* Events Section */}
                <DashboardCard
                    title="Upcoming Events"
                    icon={<Event />}
                    headerColor="bg-green-50"
                    textColor="text-green-600"
                    data={events}
                    renderItem={(item) => (
                        <div key={item._id} className="mb-4 last:mb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                            <div className="mt-2 flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    <CalendarToday className="w-4 h-4 inline mr-1" />
                                    {item.date}
                                </span>
                                <button className="text-green-600 hover:text-green-700">Register Now</button>
                            </div>
                        </div>
                    )}
                />

                {/* Clubs Section */}
                <DashboardCard
                    title="Your Clubs"
                    icon={<Group />}
                    headerColor="bg-blue-50"
                    textColor="text-blue-600"
                    data={clubs}
                    renderItem={(item) => (
                        <div key={item._id} className="mb-4 last:mb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                            <h4 className="font-bold text-gray-800">{item.name}</h4>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                            <div className="mt-2 flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    <People className="w-4 h-4 inline mr-1" />
                                    {item.members} members
                                </span>
                                <button className="text-blue-600 hover:text-blue-700">View Club</button>
                            </div>
                        </div>
                    )}
                />

                {/* Discussions Section */}
                <DashboardCard
                    title="Latest Discussions"
                    icon={<Forum />}
                    headerColor="bg-purple-50"
                    textColor="text-purple-600"
                    data={discussions}
                    renderItem={(item) => (
                        <div key={item._id} className="mb-4 last:mb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 mt-1">{item.content}</p>
                            <div className="mt-2 flex items-center justify-between text-sm">
                                <span className="text-gray-500">
                                    <Message className="w-4 h-4 inline mr-1" />
                                    {item.replies} replies
                                </span>
                                <button className="text-purple-600 hover:text-purple-700">Join Discussion</button>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

// Helper Components
const QuickStat = ({ icon, title, count, color, textColor }) => (
    <div className={`${color} rounded-xl p-6 flex items-center space-x-4`}>
        <div className="p-3 bg-white rounded-lg">{icon}</div>
        <div>
            <h4 className="text-gray-600 font-medium">{title}</h4>
            <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
        </div>
    </div>
);

const DashboardCard = ({ title, icon, headerColor, textColor, data, renderItem }) => (
    <section className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className={`${headerColor} px-6 py-4 border-b flex justify-between items-center`}>
            <div className="flex items-center space-x-2">
                <span className={textColor}>{icon}</span>
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            </div>
            <button className={`text-sm ${textColor} hover:opacity-75 flex items-center`}>
                View All
                <ArrowForward className="ml-1 w-4 h-4" />
            </button>
        </div>
        <div className="p-6">
            {data.slice(0, 3).map(renderItem)}
        </div>
    </section>
);

export default StudentHome;