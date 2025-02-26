import axios from "axios";
import { useEffect, useState } from "react";

// Dummy club data
const dummyClubs = [
	{ _id: "1", name: "AI & Robotics Club", description: "Exploring AI, ML, and Robotics with hands-on projects." },
	{ _id: "2", name: "Coding Club", description: "A community for coding enthusiasts to solve problems and build projects." },
	{ _id: "3", name: "Photography Club", description: "Capture moments and enhance your photography skills." },
	{ _id: "4", name: "Music Club", description: "A space for musicians to collaborate and create music." },
	{ _id: "5", name: "Debate Club", description: "Sharpen your debating skills and engage in intellectual discussions." },
	{ _id: "6", name: "Entrepreneurship Club", description: "For aspiring entrepreneurs to discuss business ideas and innovation." },
];

const AdminClubs = () => {
	const [clubs, setClubs] = useState([]);
	const [joinedClubs, setJoinedClubs] = useState({}); // Tracks joined clubs

	useEffect(() => {
		const fetchClubs = async () => {
			try {
				const response = await axios.post("http://localhost:5000/club/", { criteria: {}, projection: {} }); // Adjust API URL if needed
				setClubs(response.data);
			} catch (error) {
				console.error("Error fetching clubs:", error);
				setClubs(dummyClubs)
			}
		};
		fetchClubs();
	}, []);


	// Handle Join Button Click
	const handleJoin = (clubId) => {
		setJoinedClubs((prev) => ({
			...prev,
			[clubId]: !prev[clubId], // Toggle join status
		}));
	};

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Clubs</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{clubs.map((club) => (
					<div key={club._id} className="bg-white shadow-md rounded-lg p-4">
						<h3 className="text-xl font-semibold">{club.name}</h3>
						<p className="text-gray-600">{club.description}</p>
						<button
							className={`mt-3 px-4 py-2 rounded ${joinedClubs[club._id] ? "bg-green-500 text-white" : "bg-blue-500 text-white"
								}`}
							onClick={() => handleJoin(club._id)}
						>
							{joinedClubs[club._id] ? "Joined" : "Join"}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminClubs;
