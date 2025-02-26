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
		attachments: ["https://via.placeholder.com/150"],
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
	{
		_id: "4",
		title: "New Library Books Available",
		content: "The university library has added new books on AI, Web Development, and Cybersecurity.",
		author: "Library Admin",
		postedAt: "2024-02-18",
		attachments: [],
	},
	{
		_id: "5",
		title: "Internship Fair 2024",
		content: "The university is organizing an internship fair with top companies on March 5.",
		author: "Career Services",
		postedAt: "2024-02-15",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "6",
		title: "Blood Donation Camp",
		content: "Join the blood donation drive on campus and help save lives. Register now!",
		author: "Health Club",
		postedAt: "2024-02-12",
		attachments: [],
	},
	{
		_id: "7",
		title: "Coding Competition: HackTheCode",
		content: "Participate in the annual coding competition and win exciting prizes!",
		author: "Tech Club",
		postedAt: "2024-02-10",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "8",
		title: "Career Guidance Session",
		content: "An interactive career guidance session with industry leaders. Register now!",
		author: "Placement Cell",
		postedAt: "2024-02-08",
		attachments: [],
	},
	{
		_id: "9",
		title: "Hostel Maintenance Notice",
		content: "Hostel maintenance work will be carried out from Feb 20-22. Plan accordingly.",
		author: "Hostel Warden",
		postedAt: "2024-02-06",
		attachments: [],
	},
	{
		_id: "10",
		title: "Alumni Meet 2024",
		content: "The university alumni meet is scheduled for March 1. Join and reconnect!",
		author: "Alumni Association",
		postedAt: "2024-02-04",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "11",
		title: "Cultural Fest 2024 Registrations Open",
		content: "Join us for a week of music, dance, and drama. Register by March 3!",
		author: "Cultural Committee",
		postedAt: "2024-02-02",
		attachments: [],
	},
	{
		_id: "12",
		title: "Scholarship Application Deadline",
		content: "The last date to apply for scholarships is March 15. Submit your applications now.",
		author: "Finance Office",
		postedAt: "2024-01-30",
		attachments: [],
	},
	{
		_id: "13",
		title: "Debate Competition - Speak Up!",
		content: "Participate in the university-level debate competition. Registrations close soon!",
		author: "Debate Club",
		postedAt: "2024-01-28",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "14",
		title: "Student Elections 2024",
		content: "Nominations for the student council are now open. Submit your application before Feb 10.",
		author: "Admin",
		postedAt: "2024-01-26",
		attachments: [],
	},
	{
		_id: "15",
		title: "Photography Contest",
		content: "Showcase your photography skills in our annual contest. Submit by March 7.",
		author: "Media Club",
		postedAt: "2024-01-24",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "16",
		title: "Hackathon 2024 - Register Now",
		content: "Join the biggest hackathon of the year and solve real-world problems.",
		author: "Tech Club",
		postedAt: "2024-01-22",
		attachments: [],
	},
	{
		_id: "17",
		title: "Environmental Awareness Drive",
		content: "Participate in our tree-planting and sustainability awareness campaign.",
		author: "Eco Club",
		postedAt: "2024-01-20",
		attachments: ["https://via.placeholder.com/150"],
	},
	{
		_id: "18",
		title: "Exam Form Submission Reminder",
		content: "Students are reminded to submit their exam forms before the deadline.",
		author: "Exam Cell",
		postedAt: "2024-01-18",
		attachments: [],
	},
	{
		_id: "19",
		title: "Yoga & Meditation Workshop",
		content: "Join the yoga and meditation workshop for stress relief and wellness.",
		author: "Health Club",
		postedAt: "2024-01-16",
		attachments: [],
	},
	{
		_id: "20",
		title: "Campus Placements Update",
		content: "New companies have been added to the placement drive. Check the portal for details.",
		author: "Placement Cell",
		postedAt: "2024-01-14",
		attachments: ["https://via.placeholder.com/150"],
	},
];

const Announcements = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
  
	useEffect(() => {
	  const fetchAnnouncements = async () => {
		try {
		  const response = await axios.post("http://localhost:5000/announcement/", { criteria: {}, projection: {} });
		  setAnnouncements(response.data);
		} catch (error) {
		  console.error("Error fetching announcements:", error);
		  setAnnouncements(dummyAnnouncements); // Use dummy data if API fails
		} finally {
		  setLoading(false);
		}
	  };
	  fetchAnnouncements();
	}, []);
  
	// Filter announcements based on search query
	const filteredAnnouncements = announcements.filter(announcement =>
	  announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
	  announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
	);
  
	return (
	  <div className="p-6">
		<h2 className="text-3xl font-bold mb-4">Announcements</h2>
  
		{/* Search Input */}
		<div className="mb-4">
		  <input
			type="text"
			placeholder="Search announcements..."
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			className="w-full px-4 py-2 border rounded-md"
		  />
		</div>
  
		{/* Loading Indicator */}
		{loading ? (
		  <div className="flex justify-center items-center">
			<svg
			  className="animate-spin h-8 w-8 text-blue-600"
			  xmlns="http://www.w3.org/2000/svg"
			  fill="none"
			  viewBox="0 0 24 24"
			>
			  <circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			  ></circle>
			  <path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
			  ></path>
			</svg>
		  </div>
		) : (
		  <div className="space-y-6">
			{filteredAnnouncements.map((announcement) => (
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
		)}
	  </div>
	);
  };
  
  export default Announcements;
