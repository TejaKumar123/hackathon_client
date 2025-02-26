import { useState } from "react";

// Dummy announcements (initial data)
const initialAnnouncements = [
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
];

const AdminAnnouncements = () => {
	const [announcements, setAnnouncements] = useState(initialAnnouncements);
	const [formData, setFormData] = useState({ title: "", content: "", author: "", attachments: "" });
	const [editingId, setEditingId] = useState(null);

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle adding/updating announcement
	const handleSubmit = (e) => {
		e.preventDefault();

		// Convert attachments string into an array
		const attachmentArray = formData.attachments
			.split(",")
			.map((url) => url.trim())
			.filter((url) => url !== "");

		if (editingId) {
			// Update existing announcement
			setAnnouncements((prev) =>
				prev.map((ann) =>
					ann._id === editingId ? { ...ann, ...formData, attachments: attachmentArray } : ann
				)
			);
			setEditingId(null);
		} else {
			// Add new announcement
			const newAnnouncement = {
				_id: Date.now().toString(), // Unique ID
				title: formData.title,
				content: formData.content,
				author: formData.author,
				attachments: attachmentArray,
				postedAt: new Date().toISOString(),
			};
			setAnnouncements([...announcements, newAnnouncement]);
		}

		// Reset form
		setFormData({ title: "", content: "", author: "", attachments: "" });
	};

	// Handle deleting an announcement
	const handleDelete = (id) => {
		setAnnouncements((prev) => prev.filter((ann) => ann._id !== id));
	};

	// Handle editing an announcement (populate form)
	const handleEdit = (announcement) => {
		setEditingId(announcement._id);
		setFormData({
			title: announcement.title,
			content: announcement.content,
			author: announcement.author,
			attachments: announcement.attachments.join(", "),
		});
	};

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Manage Announcements</h2>

			{/* Form for Adding/Editing Announcements */}
			<form onSubmit={handleSubmit} className="bg-white shadow-md p-4 mb-6 rounded-lg">
				<h3 className="text-xl font-semibold">{editingId ? "Edit Announcement" : "Add Announcement"}</h3>
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={formData.title}
					onChange={handleChange}
					required
					className="w-full p-2 border rounded mt-2"
				/>
				<textarea
					name="content"
					placeholder="Content"
					value={formData.content}
					onChange={handleChange}
					required
					className="w-full p-2 border rounded mt-2"
				/>
				<input
					type="text"
					name="author"
					placeholder="Author"
					value={formData.author}
					onChange={handleChange}
					required
					className="w-full p-2 border rounded mt-2"
				/>
				<input
					type="text"
					name="attachments"
					placeholder="Attachment URLs (comma-separated)"
					value={formData.attachments}
					onChange={handleChange}
					className="w-full p-2 border rounded mt-2"
				/>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 rounded">
					{editingId ? "Update" : "Add"}
				</button>
				{editingId && (
					<button type="button" onClick={() => setEditingId(null)} className="ml-3 bg-gray-400 text-white px-4 py-2 rounded">
						Cancel
					</button>
				)}
			</form>

			{/* Announcements List */}
			<div className="space-y-6">
				{announcements.map((announcement) => (
					<div key={announcement._id} className="bg-white shadow-md rounded-lg p-4">
						<h3 className="text-xl font-semibold">{announcement.title}</h3>
						<p className="text-gray-600">{announcement.content}</p>
						<p className="text-sm text-gray-500 mt-2">
							Posted by {announcement.author} on {new Date(announcement.postedAt).toLocaleDateString()}
						</p>

						{/* Attachments */}
						{announcement.attachments.length > 0 && (
							<div className="mt-3">
								<h4 className="text-lg font-medium">Attachments:</h4>
								<div className="flex space-x-2 mt-2">
									{announcement.attachments.map((file, index) => (
										<a key={index} href={file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
											View Attachment {index + 1}
										</a>
									))}
								</div>
							</div>
						)}

						{/* Edit & Delete Buttons */}
						<div className="mt-3">
							<button onClick={() => handleEdit(announcement)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
								Edit
							</button>
							<button onClick={() => handleDelete(announcement._id)} className="bg-red-500 text-white px-4 py-2 rounded">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminAnnouncements;
