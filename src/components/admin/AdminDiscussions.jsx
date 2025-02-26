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
];

const AdminDiscussions = () => {
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

export default AdminDiscussions;
