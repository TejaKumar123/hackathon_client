import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Edit, Add, Delete } from "@mui/icons-material";

// Dummy event data
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
];

const AdminEvents = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [open, setOpen] = useState(false); // Modal State
	const [editingEvent, setEditingEvent] = useState(null); // Event being edited
	const [eventData, setEventData] = useState({ title: "", content: "", author: "", attachments: "" });

	useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const response = await axios.post("http://localhost:5000/announcement/", { criteria: {}, projection: {} });
				setAnnouncements(response.data);
			} catch (error) {
				console.error("Error fetching announcements:", error);
				setAnnouncements(dummyAnnouncements);
			}
		};
		fetchAnnouncements();
	}, []);

	// Open Modal (For Create/Edit)
	const handleOpen = (event = null) => {
		setEditingEvent(event);
		setEventData(event ? { title: event.title, content: event.content, author: event.author, attachments: event.attachments.join(", ") } : { title: "", content: "", author: "", attachments: "" });
		setOpen(true);
	};

	// Close Modal
	const handleClose = () => {
		setOpen(false);
		setEditingEvent(null);
	};

	// Handle Input Change
	const handleChange = (e) => {
		setEventData({ ...eventData, [e.target.name]: e.target.value });
	};

	// Handle Create/Edit Submission
	const handleSubmit = async () => {
		const formattedAttachments = eventData.attachments.split(",").map((url) => url.trim());

		if (editingEvent) {
			// Edit Event API Call
			console.log("Updating Event:", eventData);
			setAnnouncements((prev) =>
				prev.map((event) => (event._id === editingEvent._id ? { ...event, ...eventData, attachments: formattedAttachments } : event))
			);
		} else {
			// Create Event API Call
			console.log("Creating Event:", eventData);
			const newEvent = { _id: Date.now().toString(), ...eventData, attachments: formattedAttachments, postedAt: new Date().toISOString() };
			setAnnouncements((prev) => [...prev, newEvent]);
		}
		handleClose();
	};

	// Handle Delete Event
	const handleDelete = async (eventId) => {
		console.log("Deleting Event:", eventId);
		setAnnouncements((prev) => prev.filter((event) => event._id !== eventId));
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-3xl font-bold">Events</h2>
				<Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
					Create Event
				</Button>
			</div>

			<div className="space-y-6">
				{announcements.map((announcement) => (
					<div key={announcement._id} className="bg-white shadow-md rounded-lg p-4 relative">
						<div className="absolute top-2 right-2 flex gap-2">
							<IconButton onClick={() => handleOpen(announcement)}>
								<Edit color="primary" />
							</IconButton>
							<IconButton onClick={() => handleDelete(announcement._id)}>
								<Delete color="error" />
							</IconButton>
						</div>
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

			{/* Create/Edit Event Modal */}
			<Dialog open={open} onClose={handleClose} fullWidth>
				<DialogTitle>{editingEvent ? "Edit Event" : "Create Event"}</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						name="title"
						label="Event Title"
						type="text"
						fullWidth
						value={eventData.title}
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						name="content"
						label="Description"
						type="text"
						fullWidth
						multiline
						rows={3}
						value={eventData.content}
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						name="author"
						label="Author"
						type="text"
						fullWidth
						value={eventData.author}
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						name="attachments"
						label="Attachments (comma-separated URLs)"
						type="text"
						fullWidth
						value={eventData.attachments}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="secondary">Cancel</Button>
					<Button onClick={handleSubmit} color="primary">{editingEvent ? "Update" : "Create"}</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AdminEvents;
