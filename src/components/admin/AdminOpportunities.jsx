import { useEffect, useState } from "react";

// Dummy opportunity data (used as initial data)
const dummyOpportunities = [
	{
		_id: "1",
		title: "Software Engineer Intern",
		type: "Internship",
		company: "Google",
		location: "Remote",
		description: "Work on Google's AI products and collaborate with industry experts.",
		requirements: ["Python", "Machine Learning", "Data Structures"],
		stipend: "$2000/month",
		applyLink: "https://careers.google.com",
		deadline: "2024-03-15",
		status: "Open",
	},
	{
		_id: "2",
		title: "Frontend Developer",
		type: "Job",
		company: "Amazon",
		location: "On-Site - Seattle",
		description: "Build and optimize the UI of Amazon’s e-commerce platform.",
		requirements: ["React.js", "CSS", "JavaScript"],
		stipend: "$120,000/year",
		applyLink: "https://amazon.jobs",
		deadline: "2024-03-20",
		status: "Open",
	},
];

const AdminOpportunities = () => {
	const [opportunities, setOpportunities] = useState([]);
	const [selectedType, setSelectedType] = useState("All");
	const [newOpportunity, setNewOpportunity] = useState({
		title: "",
		type: "Internship",
		company: "",
		location: "",
		description: "",
		requirements: "",
		stipend: "",
		applyLink: "",
		deadline: "",
		status: "Open",
	});
	const [editingOpportunity, setEditingOpportunity] = useState(null);

	useEffect(() => {
		// Simulating API fetch
		setOpportunities(dummyOpportunities);
	}, []);

	// Add a new opportunity
	const addOpportunity = () => {
		if (!newOpportunity.title || !newOpportunity.company) {
			alert("Title and company are required!");
			return;
		}

		const newEntry = {
			...newOpportunity,
			_id: String(Date.now()), // Generate a unique ID
			requirements: newOpportunity.requirements.split(",").map((r) => r.trim()), // Convert string to array
		};

		setOpportunities([...opportunities, newEntry]);
		setNewOpportunity({
			title: "",
			type: "Internship",
			company: "",
			location: "",
			description: "",
			requirements: "",
			stipend: "",
			applyLink: "",
			deadline: "",
			status: "Open",
		});
	};

	// Edit an opportunity
	const updateOpportunity = () => {
		if (!editingOpportunity.title || !editingOpportunity.company) {
			alert("Title and company are required!");
			return;
		}

		setOpportunities(
			opportunities.map((opp) =>
				opp._id === editingOpportunity._id ? editingOpportunity : opp
			)
		);
		setEditingOpportunity(null);
	};

	// Delete an opportunity
	const deleteOpportunity = (id) => {
		setOpportunities(opportunities.filter((opp) => opp._id !== id));
	};

	// Handle input changes
	const handleInputChange = (e, isEditing = false) => {
		const { name, value } = e.target;
		if (isEditing) {
			setEditingOpportunity((prev) => ({ ...prev, [name]: value }));
		} else {
			setNewOpportunity((prev) => ({ ...prev, [name]: value }));
		}
	};

	const filteredOpportunities =
		selectedType === "All"
			? opportunities
			: opportunities.filter((opportunity) => opportunity.type === selectedType);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Opportunities</h2>

			{/* Filter Buttons */}
			<div className="flex space-x-4 mb-6">
				{["All", "Internship", "Job"].map((type) => (
					<button
						key={type}
						className={`px-4 py-2 rounded ${selectedType === type ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
							}`}
						onClick={() => setSelectedType(type)}
					>
						{type}
					</button>
				))}
			</div>

			{/* Form to add or edit opportunities */}
			<div className="bg-gray-100 p-4 rounded mb-6">
				<h3 className="text-lg font-bold mb-2">{editingOpportunity ? "Edit Opportunity" : "Add New Opportunity"}</h3>
				<div className="grid grid-cols-2 gap-4">
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={editingOpportunity ? editingOpportunity.title : newOpportunity.title}
						onChange={(e) => handleInputChange(e, !!editingOpportunity)}
						className="border p-2 rounded"
					/>
					<input
						type="text"
						name="company"
						placeholder="Company"
						value={editingOpportunity ? editingOpportunity.company : newOpportunity.company}
						onChange={(e) => handleInputChange(e, !!editingOpportunity)}
						className="border p-2 rounded"
					/>
					<input
						type="text"
						name="location"
						placeholder="Location"
						value={editingOpportunity ? editingOpportunity.location : newOpportunity.location}
						onChange={(e) => handleInputChange(e, !!editingOpportunity)}
						className="border p-2 rounded"
					/>
					<input
						type="text"
						name="stipend"
						placeholder="Stipend"
						value={editingOpportunity ? editingOpportunity.stipend : newOpportunity.stipend}
						onChange={(e) => handleInputChange(e, !!editingOpportunity)}
						className="border p-2 rounded"
					/>
					<input
						type="text"
						name="applyLink"
						placeholder="Apply Link"
						value={editingOpportunity ? editingOpportunity.applyLink : newOpportunity.applyLink}
						onChange={(e) => handleInputChange(e, !!editingOpportunity)}
						className="border p-2 rounded"
					/>
					<input
						type="date"
						name="deadline"
						value={editingOpportunity ? editingOpportunity.deadline : newOpportunity.deadline}
						onChange={(e) => handleInputChange(e, !!editingOpportunity)}
						className="border p-2 rounded"
					/>
				</div>
				{editingOpportunity ? (
					<button onClick={updateOpportunity} className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded">
						Update
					</button>
				) : (
					<button onClick={addOpportunity} className="mt-3 px-4 py-2 bg-green-500 text-white rounded">
						Add
					</button>
				)}
			</div>

			{/* List of Opportunities */}
			<div className="space-y-6">
				{filteredOpportunities.map((opportunity) => (
					<div key={opportunity._id} className="bg-white shadow-md rounded-lg p-4">
						<h3 className="text-xl font-semibold">{opportunity.title}</h3>
						<p className="text-gray-700"><span className="font-medium">Company:</span> {opportunity.company}</p>
						<p className="text-gray-700"><span className="font-medium">Location:</span> {opportunity.location}</p>
						<p className="text-gray-600">{opportunity.description}</p>
						<p className="mt-2 text-gray-500"><span className="font-medium">Stipend:</span> {opportunity.stipend}</p>
						<p className="text-sm text-gray-500 mt-2">Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</p>

						<div className="mt-3 space-x-2">
							<button onClick={() => setEditingOpportunity(opportunity)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
							<button onClick={() => deleteOpportunity(opportunity._id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminOpportunities;
