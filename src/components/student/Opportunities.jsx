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
	{
		_id: "4",
		title: "Backend Developer",
		type: "Job",
		company: "Netflix",
		location: "Remote",
		description: "Develop scalable microservices for Netflix's streaming platform.",
		requirements: ["Node.js", "MongoDB", "AWS"],
		stipend: "$130,000/year",
		applyLink: "https://jobs.netflix.com",
		deadline: "2024-04-05",
		status: "Open",
	},
	{
		_id: "5",
		title: "Cybersecurity Analyst",
		type: "Job",
		company: "IBM",
		location: "On-Site - New York",
		description: "Monitor and secure IBM's network infrastructure.",
		requirements: ["Cybersecurity", "Networking", "SIEM"],
		stipend: "$110,000/year",
		applyLink: "https://ibm.com/careers",
		deadline: "2024-03-30",
		status: "Open",
	},
	{
		_id: "6",
		title: "AI Research Intern",
		type: "Internship",
		company: "OpenAI",
		location: "Remote",
		description: "Contribute to the research and development of AI models.",
		requirements: ["Deep Learning", "Python", "NLP"],
		stipend: "$2500/month",
		applyLink: "https://openai.com/careers",
		deadline: "2024-04-10",
		status: "Open",
	},
	{
		_id: "7",
		title: "Full Stack Developer",
		type: "Job",
		company: "Meta",
		location: "Hybrid",
		description: "Develop and maintain scalable web applications.",
		requirements: ["React", "Node.js", "GraphQL"],
		stipend: "$140,000/year",
		applyLink: "https://meta.com/careers",
		deadline: "2024-04-15",
		status: "Open",
	},
	{
		_id: "8",
		title: "Blockchain Developer",
		type: "Job",
		company: "Coinbase",
		location: "Remote",
		description: "Develop and secure blockchain-based financial solutions.",
		requirements: ["Ethereum", "Solidity", "Cryptography"],
		stipend: "$135,000/year",
		applyLink: "https://coinbase.com/careers",
		deadline: "2024-04-20",
		status: "Open",
	},
	{
		_id: "9",
		title: "Cloud Engineer Intern",
		type: "Internship",
		company: "AWS",
		location: "On-Site - Seattle",
		description: "Assist in managing AWS cloud infrastructure.",
		requirements: ["AWS", "Docker", "Kubernetes"],
		stipend: "$2000/month",
		applyLink: "https://aws.amazon.com/careers",
		deadline: "2024-04-25",
		status: "Open",
	},
	{
		_id: "10",
		title: "UI/UX Designer",
		type: "Job",
		company: "Adobe",
		location: "Remote",
		description: "Design user-centric interfaces for Adobe products.",
		requirements: ["Figma", "Adobe XD", "Prototyping"],
		stipend: "$100,000/year",
		applyLink: "https://adobe.com/careers",
		deadline: "2024-05-01",
		status: "Open",
	},
	{
		_id: "11",
		title: "Game Developer Intern",
		type: "Internship",
		company: "Epic Games",
		location: "Hybrid",
		description: "Work on game mechanics and optimization in Unreal Engine.",
		requirements: ["C++", "Unreal Engine", "Game Physics"],
		stipend: "$1500/month",
		applyLink: "https://epicgames.com/careers",
		deadline: "2024-05-10",
		status: "Open",
	},
	{
		_id: "12",
		title: "Mobile App Developer",
		type: "Job",
		company: "TikTok",
		location: "On-Site - Los Angeles",
		description: "Develop and optimize mobile apps for TikTok users.",
		requirements: ["Flutter", "Kotlin", "Swift"],
		stipend: "$125,000/year",
		applyLink: "https://tiktok.com/careers",
		deadline: "2024-05-15",
		status: "Open",
	},
	{
		_id: "13",
		title: "DevOps Engineer",
		type: "Job",
		company: "Oracle",
		location: "Remote",
		description: "Manage CI/CD pipelines and cloud deployments.",
		requirements: ["Kubernetes", "Terraform", "CI/CD"],
		stipend: "$115,000/year",
		applyLink: "https://oracle.com/careers",
		deadline: "2024-05-20",
		status: "Open",
	},
	{
		_id: "14",
		title: "AR/VR Developer",
		type: "Job",
		company: "Unity Technologies",
		location: "Hybrid",
		description: "Develop AR/VR applications using Unity3D.",
		requirements: ["Unity", "C#", "XR Development"],
		stipend: "$130,000/year",
		applyLink: "https://unity.com/careers",
		deadline: "2024-05-30",
		status: "Open",
	}
];


const Opportunities = () => {
	const [opportunities, setOpportunities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedType, setSelectedType] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
  
	useEffect(() => {
	  const fetchOpportunities = async () => {
		try {
		  const response = await axios.post("http://localhost:5000/opportunity/", { criteria: {}, projection: {} });
		  setOpportunities(response.data);
		} catch (error) {
		  console.error("Error fetching opportunities:", error);
		  setOpportunities(dummyOpportunities);
		} finally {
		  setLoading(false);
		}
	  };
	  fetchOpportunities();
	}, []);
  
	// Filter opportunities based on type and search query
	const filteredOpportunities = opportunities.filter(opportunity => {
	  const matchesType = selectedType === "All" || opportunity.type === selectedType;
	  const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							opportunity.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
							opportunity.description.toLowerCase().includes(searchQuery.toLowerCase());
	  return matchesType && matchesSearch;
	});
  
	return (
	  <div className="p-6">
		<h2 className="text-3xl font-bold mb-4">Opportunities</h2>
  
		{/* Search Input */}
		<div className="mb-4">
		  <input
			type="text"
			placeholder="Search opportunities..."
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			className="w-full px-4 py-2 border rounded-md"
		  />
		</div>
  
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
		)}
	  </div>
	);
  };
  
  export default Opportunities;
