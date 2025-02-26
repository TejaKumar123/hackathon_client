import axios from "axios";
import { useEffect, useState } from "react";

// Dummy announcement data
const dummyAnnouncements = [
	{
		_id: "1",
		title: "Semester Exams Schedule Released",
		content: "The final semester exams will start from 10th March. Check the official university website for details.",
		author: "Admin",
		postedAt: "2024-02-25",
		attachments: ["https://via.placeholder.com/150"], // Example image
	},
	{
		_id: "2",
		title: "New Research Funding Opportunities",
		content: "Students interested in AI research can apply for the university's new research funding program.",
		author: "Prof. John Doe",
		postedAt: "2024-02-22",
		attachments: [],
	},
	{
		_id: "3",
		title: "Campus Festival Registration Open!",
		content: "Join us for the annual campus festival filled with cultural events, music, and sports!",
		author: "Student Council",
		postedAt: "2024-02-20",
		attachments: ["https://via.placeholder.com/150"],
	},
];

const AdminEvents = () => {
	const [announcements, setAnnouncements] = useState([]);

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const response = await axios.post("http://localhost:5000/announcement/", { criteria: {}, projection: {} }); // Adjust API URL if needed
				setAnnouncements(response.data);
			} catch (error) {
				console.error("Error fetching announcements:", error);
				setAnnouncements(dummyAnnouncements); // Use dummy data on failure
			}
		};
		fetchAnnouncements();
	}, []);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Events</h2>
			<div className="space-y-6">
				{announcements.map((announcement) => (
					<div key={announcement._id} className="bg-white shadow-md rounded-lg p-4">
						<h3 className="text-xl font-semibold">{announcement.title}</h3>
						<p className="text-gray-600">{announcement.content}</p>
						<p className="text-sm text-gray-500 mt-2">Posted by {announcement.author} on {new Date(announcement.postedAt).toLocaleDateString()}</p>

						{announcement.attachments.length > 0 && (
							<div className="mt-3">
								<h4 className="text-lg font-medium">Attachments:</h4>
								<div className="flex space-x-2 mt-2">
									{announcement.attachments.map((file, index) => (
										<a
											key={index}
											href={file}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-500 underline"
										>
											View Attachment {index + 1}
										</a>
									))}
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminEvents;
