import axios from "axios";
import { useEffect, useState } from "react";

const dummyDiscussions = [
	{
		_id: "1",
		title: "Upcoming Hackathon 2024!",
		content: "A national-level hackathon is coming up. Let's discuss strategies and team-building!",
		author: "Alice Johnson",
		category: "Event",
		createdAt: "2024-02-20",
	},
	{
		_id: "2",
		title: "AI & Robotics Club - Project Ideas",
		content: "What are some interesting AI projects we can work on as a club?",
		author: "Bob Smith",
		category: "Club",
		createdAt: "2024-02-18",
	},
	{
		_id: "3",
		title: "Internship Opportunities at Google",
		content: "Google is offering summer internships. Let's share tips and application details!",
		author: "Charlie Davis",
		category: "Opportunities",
		createdAt: "2024-02-15",
	},
	{
		_id: "4",
		title: "Best Resources for Learning Full-Stack Development",
		content: "Can anyone recommend good resources for MERN stack learning?",
		author: "David Lee",
		category: "Learning",
		createdAt: "2024-02-12",
	},
	{
		_id: "5",
		title: "Cybersecurity Awareness Workshop",
		content: "Discussion on the upcoming cybersecurity workshop. What topics should we focus on?",
		author: "Emma Brown",
		category: "Event",
		createdAt: "2024-02-10",
	},
	{
		_id: "6",
		title: "How to Prepare for Coding Interviews?",
		content: "What are the best platforms and techniques to crack FAANG interviews?",
		author: "Frank Wilson",
		category: "Career",
		createdAt: "2024-02-08",
	},
	{
		_id: "7",
		title: "The Future of AI in Education",
		content: "How can AI enhance the education sector and learning experience?",
		author: "Grace Miller",
		category: "Technology",
		createdAt: "2024-02-05",
	},
	{
		_id: "8",
		title: "Freelancing vs Full-Time Job in Tech",
		content: "Which is better in terms of income, stability, and work-life balance?",
		author: "Henry Adams",
		category: "Career",
		createdAt: "2024-02-02",
	},
	{
		_id: "9",
		title: "Upcoming Tech Conferences in 2024",
		content: "Which tech events should we attend this year?",
		author: "Isabella Thompson",
		category: "Event",
		createdAt: "2024-01-30",
	},
	{
		_id: "10",
		title: "Best Open-Source Projects to Contribute to in 2024",
		content: "Looking for beginner-friendly open-source projects. Any recommendations?",
		author: "Jack Robinson",
		category: "Learning",
		createdAt: "2024-01-28",
	},
	{
		_id: "11",
		title: "How to Get Started with Blockchain Development?",
		content: "What are the best resources and frameworks for blockchain development?",
		author: "Laura Martinez",
		category: "Technology",
		createdAt: "2024-01-25",
	},
	{
		_id: "12",
		title: "Best Websites for Competitive Programming",
		content: "Which platforms are best for improving problem-solving skills?",
		author: "Michael Carter",
		category: "Learning",
		createdAt: "2024-01-22",
	},
	{
		_id: "13",
		title: "Tips for Writing a Strong Resume for Tech Jobs",
		content: "What key points should be included in a tech resume?",
		author: "Nancy White",
		category: "Career",
		createdAt: "2024-01-20",
	},
	{
		_id: "14",
		title: "Best Tools for UI/UX Design in 2024",
		content: "Which design tools are trending for UI/UX designers?",
		author: "Oliver Scott",
		category: "Technology",
		createdAt: "2024-01-18",
	},
	{
		_id: "15",
		title: "AI & Robotics Club - Monthly Meetup Agenda",
		content: "What topics should we cover in this month's meeting?",
		author: "Paul Walker",
		category: "Club",
		createdAt: "2024-01-15",
	},
	{
		_id: "16",
		title: "Entrepreneurship: How to Build a Startup from Scratch?",
		content: "What are the key steps in turning an idea into a business?",
		author: "Rachel Green",
		category: "Opportunities",
		createdAt: "2024-01-12",
	},
	{
		_id: "17",
		title: "Best AI Frameworks for Machine Learning",
		content: "Which ML frameworks are the most efficient in 2024?",
		author: "Steve Harris",
		category: "Technology",
		createdAt: "2024-01-10",
	},
	{
		_id: "18",
		title: "How to Balance Coding and Academics?",
		content: "Tips for managing coding practice alongside college studies.",
		author: "Tina Anderson",
		category: "Learning",
		createdAt: "2024-01-07",
	},
	{
		_id: "19",
		title: "Upcoming Hackathons in 2024 - Where to Participate?",
		content: "List of upcoming national and international hackathons.",
		author: "Uma Patel",
		category: "Event",
		createdAt: "2024-01-05",
	},
	{
		_id: "20",
		title: "How to Get Clients as a Freelancer?",
		content: "Best platforms and strategies to land freelancing projects.",
		author: "Victor Reynolds",
		category: "Career",
		createdAt: "2024-01-03",
	},
];


const Discussions = () => {
	const [discussions, setDiscussions] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("All");

	useEffect(() => {
		const fetchDiscussions = async () => {
			try {
				const response = await axios.post("http://localhost:5000/discussion/", { criteria: {}, projection: {} });
				setDiscussions(response.data);
			} catch (error) {
				console.error("Error fetching discussions:", error);
				setDiscussions(dummyDiscussions);
			}
		};
		fetchDiscussions();
	}, []);

	// Filter discussions based on category
	const filteredDiscussions = selectedCategory === "All"
		? discussions
		: discussions.filter(discussion => discussion.category === selectedCategory);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Discussions</h2>

			{/* Category Filters */}
			<div className="flex space-x-4 mb-6">
				{["All", "Event", "Club", "Opportunities"].map(category => (
					<button
						key={category}
						className={`px-4 py-2 rounded ${selectedCategory === category
								? "bg-blue-600 text-white"
								: "bg-gray-200 text-gray-800"
							}`}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</button>
				))}
			</div>
<div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold">Discussions</h2>
    <button
        onClick={() => navigate("/discussions/create")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
        Create Discussion
    </button>
</div>
			{/* Discussions List */}
			<div className="space-y-6">
				{filteredDiscussions.map((discussion) => (
					<div key={discussion._id} className="bg-white shadow-md rounded-lg p-4">
						<h3 className="text-xl font-semibold">{discussion.title}</h3>
						<p className="text-gray-600">{discussion.content}</p>
						<p className="text-sm text-gray-500 mt-2">
							Posted by {discussion.author} on {new Date(discussion.createdAt).toLocaleDateString()}
						</p>
						<span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${discussion.category === "Event" ? "bg-green-200 text-green-800" :
								discussion.category === "Club" ? "bg-blue-200 text-blue-800" :
									"bg-yellow-200 text-yellow-800"
							}`}>
							{discussion.category}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Discussions;
