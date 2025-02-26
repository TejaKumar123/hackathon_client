import { useEffect, useState } from "react";
import axios from "axios";
import { Work, School } from "@mui/icons-material";

const dummyAlumni = [
	{
		_id: "1",
		fullname: "John Doe",
		email: "john.doe@example.com",
		type: "Alumni",
		profileImg: "https://via.placeholder.com/150?text=Profile",
		company: "Google",
		position: "Software Engineer",
		graduationYear: 2020,
	},
	{
		_id: "2",
		fullname: "Jane Smith",
		email: "jane.smith@example.com",
		type: "Alumni",
		profileImg: "https://via.placeholder.com/50",
		company: "Microsoft",
		position: "Data Scientist",
		graduationYear: 2018,
	},
	{
		_id: "3",
		fullname: "Robert Brown",
		email: "robert.brown@example.com",
		type: "Alumni",
		profileImg: "https://via.placeholder.com/50",
		company: "Amazon",
		position: "Cloud Architect",
		graduationYear: 2017,
	},
];


const Alumni = () => {
	const [alumni, setAlumni] = useState([]);

	useEffect(() => {
		const fetchAlumni = async () => {
			try {
				const response = await axios.post("http://localhost:5000/alumni/", {
					criteria: { type: "Alumni" },
					projection: {},
				});
				setAlumni(response.data);
			} catch (error) {
				console.error("Error fetching alumni:", error);
				setAlumni(dummyAlumni);
			}
		};
		fetchAlumni();
	}, []);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Alumni Network</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{alumni.map((person) => (
					<div key={person._id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
						<img
							src={person.profileImg || "https://via.placeholder.com/150?text=Profile"}
							alt="Profile"
							className="w-14 h-14 rounded-full border-2 border-gray-300"
						/>
						<div>
							<h3 className="text-lg font-semibold">{person.fullname}</h3>
							<p className="text-gray-600">{person.email}</p>
							<div className="flex items-center text-gray-500 mt-1">
								<School className="mr-1 text-blue-500" /> {person.graduationYear}
							</div>
							<div className="flex items-center text-gray-500 mt-1">
								<Work className="mr-1 text-green-500" /> {person.position} at {person.company}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Alumni;
