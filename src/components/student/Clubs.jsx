import axios from "axios";
import { useEffect, useState } from "react";

// Dummy club data
const dummyClubs = [
    { _id: "1", name: "AI & Robotics Club", description: "Explore AI, ML, and Robotics." },
    { _id: "2", name: "Coding Club", description: "Solve problems and build projects!" },
    { _id: "3", name: "Music Club", description: "Showcase your musical talents." },
    { _id: "4", name: "Drama Club", description: "Act, direct, and write plays." },
    { _id: "5", name: "Photography Club", description: "Capture stunning moments." },
    { _id: "6", name: "Eco Club", description: "Work towards a sustainable future." },
    { _id: "7", name: "Entrepreneurship Club", description: "Learn how to build startups." },
    { _id: "8", name: "Sports Club", description: "Engage in various sports activities." },
    { _id: "9", name: "Debate Society", description: "Sharpen your argumentation skills." },
    { _id: "10", name: "Film & Animation Club", description: "Create short films and animations." }
];

const Clubs = () => {
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

export default Clubs;
