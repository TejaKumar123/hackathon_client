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
		attachments: ["https://via.placeholder.com/150"],
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
	{
		_id: "4",
		title: "New Books Arrived in Library",
		content: "The library has added new books on Artificial Intelligence, Cybersecurity, and Data Science.",
		author: "Library Admin",
		postedAt: "2024-02-18",
		attachments: [],
	},
	{
		_id: "5",
		title: "Internship Drive 2024",
		content: "The university is hosting an internship fair featuring top companies. Register before March 5.",
		author: "Career Services",
		postedAt: "2024-02-15",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "6",
		title: "Blood Donation Camp",
		content: "Join us for a blood donation drive to support local hospitals and save lives.",
		author: "Health Club",
		postedAt: "2024-02-12",
		attachments: [],
	},
	{
		_id: "7",
		title: "Hackathon 2024 Registrations Open!",
		content: "Participate in our annual coding competition and stand a chance to win exciting prizes.",
		author: "Tech Club",
		postedAt: "2024-02-10",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "8",
		title: "Career Counseling Session",
		content: "An interactive career guidance session with industry professionals. Register now!",
		author: "Placement Cell",
		postedAt: "2024-02-08",
		attachments: [],
	},
	{
		_id: "9",
		title: "Hostel Maintenance Alert",
		content: "Scheduled hostel maintenance will take place from Feb 20-22. Plan accordingly.",
		author: "Hostel Warden",
		postedAt: "2024-02-06",
		attachments: [],
	},
	{
		_id: "10",
		title: "Annual Alumni Meet 2024",
		content: "Reconnect with old friends and network with alumni from various industries.",
		author: "Alumni Association",
		postedAt: "2024-02-04",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "11",
		title: "Cultural Fest Auditions",
		content: "Auditions for music, dance, and drama performances are now open.",
		author: "Cultural Committee",
		postedAt: "2024-02-02",
		attachments: [],
	},
	{
		_id: "12",
		title: "Scholarship Applications Now Open",
		content: "Eligible students can apply for scholarships before the March 15 deadline.",
		author: "Finance Office",
		postedAt: "2024-01-30",
		attachments: [],
	},
	{
		_id: "13",
		title: "Debate Competition: Argument Clash",
		content: "Show off your debating skills and compete at the university-level competition.",
		author: "Debate Club",
		postedAt: "2024-01-28",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "14",
		title: "Student Council Elections",
		content: "Nominations for the student council elections are now open. Submit your application before Feb 10.",
		author: "Admin",
		postedAt: "2024-01-26",
		attachments: [],
	},
	{
		_id: "15",
		title: "Photography Contest",
		content: "Capture the beauty of campus life and submit your best photos for a chance to win.",
		author: "Media Club",
		postedAt: "2024-01-24",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "16",
		title: "University Hackathon Announced",
		content: "Solve real-world challenges and compete in the upcoming hackathon. Registrations close soon!",
		author: "Tech Club",
		postedAt: "2024-01-22",
		attachments: [],
	},
	{
		_id: "17",
		title: "Environmental Awareness Drive",
		content: "Join our tree-planting and campus clean-up initiative for a greener future.",
		author: "Eco Club",
		postedAt: "2024-01-20",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "18",
		title: "Exam Form Submission Deadline",
		content: "Submit your examination forms before the deadline to avoid penalties.",
		author: "Exam Cell",
		postedAt: "2024-01-18",
		attachments: [],
	},
	{
		_id: "19",
		title: "Yoga & Meditation Camp",
		content: "Enhance your mental well-being with a guided yoga and meditation session.",
		author: "Health Club",
		postedAt: "2024-01-16",
		attachments: [],
	},
	{
		_id: "20",
		title: "Campus Placements Update",
		content: "New recruiters have joined the placement drive. Check the portal for the latest updates.",
		author: "Placement Cell",
		postedAt: "2024-01-14",
		attachments: ["https://via.placeholder.com/150"],
	},
];

const Announcements = () => {
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

export default Announcements;
