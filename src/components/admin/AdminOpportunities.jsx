import axios from "axios";
import { useEffect, useState } from "react";

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
	{
		_id: "3",
		title: "Data Science Internship",
		type: "Internship",
		company: "Microsoft",
		location: "Hybrid",
		description: "Work on real-time data analytics and predictive models.",
		requirements: ["SQL", "Python", "TensorFlow"],
		stipend: "$1800/month",
		applyLink: "https://careers.microsoft.com",
		deadline: "2024-03-10",
		status: "Closed",
	},
];

const AdminOpportunities = () => {
	const [opportunities, setOpportunities] = useState([]);
	const [selectedType, setSelectedType] = useState("All");

	useEffect(() => {
		const fetchOpportunities = async () => {
			try {
				const response = await axios.post("http://localhost:5000/opportunity/", { criteria: {}, projection: {} });
				setOpportunities(response.data);
			} catch (error) {
				console.error("Error fetching opportunities:", error);
				setOpportunities(dummyOpportunities);
			}
		};
		fetchOpportunities();
	}, []);

	// Filter opportunities based on type
	const filteredOpportunities = selectedType === "All"
		? opportunities
		: opportunities.filter(opportunity => opportunity.type === selectedType);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Opportunities</h2>

			{/* Type Filters */}
			<div className="flex space-x-4 mb-6">
				{["All", "Internship", "Job"].map(type => (
					<button
						key={type}
						className={`px-4 py-2 rounded ${selectedType === type
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-800"
							}`}
						onClick={() => setSelectedType(type)}
					>
						{type}
					</button>
				))}
			</div>

			{/* Opportunities List */}
			<div className="space-y-6">
				{filteredOpportunities.map((opportunity) => (
					<div key={opportunity._id} className="bg-white shadow-md rounded-lg p-4">
						<h3 className="text-xl font-semibold">{opportunity.title}</h3>
						<p className="text-gray-700">
							<span className="font-medium">Company:</span> {opportunity.company}
						</p>
						<p className="text-gray-700">
							<span className="font-medium">Location:</span> {opportunity.location}
						</p>
						<p className="text-gray-600">{opportunity.description}</p>

						<p className="mt-2 text-gray-500">
							<span className="font-medium">Requirements:</span> {opportunity.requirements.join(", ")}
						</p>
						<p className="mt-1 text-gray-500">
							<span className="font-medium">Stipend:</span> {opportunity.stipend}
						</p>

						<p className="text-sm text-gray-500 mt-2">
							Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
						</p>

						<span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${opportunity.status === "Open" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
							}`}>
							{opportunity.status}
						</span>

						<a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer">
							<button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
								Apply Now
							</button>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminOpportunities;
