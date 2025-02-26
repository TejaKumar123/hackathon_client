import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Edit, Add, Delete } from "@mui/icons-material";

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
	const [joinedClubs, setJoinedClubs] = useState({});
	const [open, setOpen] = useState(false); // Modal State
	const [editingClub, setEditingClub] = useState(null); // Club being edited
	const [clubData, setClubData] = useState({ name: "", description: "" });

	useEffect(() => {
		const fetchClubs = async () => {
			try {
				const response = await axios.post("http://localhost:5000/club/", { criteria: {}, projection: {} });
				setClubs(response.data);
			} catch (error) {
				console.error("Error fetching clubs:", error);
				setClubs(dummyClubs);
			}
		};
		fetchClubs();
	}, []);

	// Handle Join Button Click
	const handleJoin = (clubId) => {
		setJoinedClubs((prev) => ({
			...prev,
			[clubId]: !prev[clubId],
		}));
	};

	// Open Modal (For Create/Edit)
	const handleOpen = (club = null) => {
		setEditingClub(club);
		setClubData(club ? { name: club.name, description: club.description } : { name: "", description: "" });
		setOpen(true);
	};

	// Close Modal
	const handleClose = () => {
		setOpen(false);
		setEditingClub(null);
	};

	// Handle Input Change
	const handleChange = (e) => {
		setClubData({ ...clubData, [e.target.name]: e.target.value });
	};

	// Handle Create/Edit Submission
	const handleSubmit = async () => {
		if (editingClub) {
			// Edit Club API Call
			console.log("Updating Club:", clubData);
			setClubs((prev) =>
				prev.map((club) => (club._id === editingClub._id ? { ...club, ...clubData } : club))
			);
		} else {
			// Create Club API Call
			console.log("Creating Club:", clubData);
			const newClub = { _id: Date.now().toString(), ...clubData }; // Temporary ID
			setClubs((prev) => [...prev, newClub]);
		}
		handleClose();
	};

	// Handle Delete Club
	const handleDelete = async (clubId) => {
		console.log("Deleting Club:", clubId);
		setClubs((prev) => prev.filter((club) => club._id !== clubId));
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-3xl font-bold">Clubs</h2>
				<Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
					Create Club
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{clubs.map((club) => (
					<div key={club._id} className="bg-white shadow-md rounded-lg p-4 relative">
						<div className="absolute top-2 right-2 flex gap-2">
							<IconButton onClick={() => handleOpen(club)}>
								<Edit color="primary" />
							</IconButton>
							<IconButton onClick={() => handleDelete(club._id)}>
								<Delete color="error" />
							</IconButton>
						</div>
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

			{/* Create/Edit Club Modal */}
			<Dialog open={open} onClose={handleClose} fullWidth>
				<DialogTitle>{editingClub ? "Edit Club" : "Create Club"}</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						name="name"
						label="Club Name"
						type="text"
						fullWidth
						value={clubData.name}
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						name="description"
						label="Description"
						type="text"
						fullWidth
						multiline
						rows={3}
						value={clubData.description}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="secondary">Cancel</Button>
					<Button onClick={handleSubmit} color="primary">{editingClub ? "Update" : "Create"}</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AdminClubs;
