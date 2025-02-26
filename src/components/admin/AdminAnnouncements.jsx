import axios from "axios";
import { useEffect, useState } from "react";

// Dummy announcement data (used if API fails)
const dummyAnnouncements = [
	{
		_id: "1",
		title: "Mid-Term Exam Schedule Released",
		content: "Mid-term exams will begin on March 15. Check the university portal for more details.",
		author: "Admin",
		postedAt: "2024-02-25",
		attachments: ["https://via.placeholder.com/150"], // Example attachment
	},
	{
		_id: "2",
		title: "Workshop on AI & Machine Learning",
		content: "A workshop on AI & ML will be conducted by industry experts. Register before March 10.",
		author: "Prof. John Doe",
		postedAt: "2024-02-22",
		attachments: [],
	},
	{
		_id: "3",
		title: "Sports Week Registration Open!",
		content: "Register now for the annual sports week and showcase your talent in various sports events.",
		author: "Student Council",
		postedAt: "2024-02-20",
		attachments: ["https://via.placeholder.com/150"],
	},
];

const AdminAnnouncements = () => {
	const [announcements, setAnnouncements] = useState([]);

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const response = await axios.post("http://localhost:5000/announcement/", { criteria: {}, projection: {} });
				setAnnouncements(response.data);
			} catch (error) {
				console.error("Error fetching announcements:", error);
				setAnnouncements(dummyAnnouncements); // Use dummy data if API fails
			}
		};
		fetchAnnouncements();
	}, []);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Announcements</h2>
			<div className="space-y-6">
				{announcements.map((announcement) => (
					<div key={announcement._id} className="bg-white shadow-md rounded-lg p-4">
						<h3 className="text-xl font-semibold">{announcement.title}</h3>
						<p className="text-gray-600">{announcement.content}</p>
						<p className="text-sm text-gray-500 mt-2">
							Posted by {announcement.author} on {new Date(announcement.postedAt).toLocaleDateString()}
						</p>

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

export default AdminAnnouncements;
