import { useEffect, useState } from "react";
import axios from "axios";
import { Work, School } from "@mui/icons-material";

const dummyAlumni = [
    {
        _id: "1",
        fullname: "John Doe",
        email: "john.doe@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/person?lock=1",
        company: "Google",
        position: "Software Engineer",
        graduationYear: 2020,
    },
    {
        _id: "2",
        fullname: "Jane Smith",
        email: "jane.smith@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/woman?lock=2",
        company: "Microsoft",
        position: "Data Scientist",
        graduationYear: 2018,
    },
    {
        _id: "3",
        fullname: "Robert Brown",
        email: "robert.brown@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/man?lock=3",
        company: "Amazon",
        position: "Cloud Architect",
        graduationYear: 2017,
    },
    {
        _id: "4",
        fullname: "Emily Johnson",
        email: "emily.johnson@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/businesswoman?lock=4",
        company: "Facebook",
        position: "Product Manager",
        graduationYear: 2019,
    },
    {
        _id: "5",
        fullname: "Michael Lee",
        email: "michael.lee@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/businessman?lock=5",
        company: "Apple",
        position: "Cybersecurity Analyst",
        graduationYear: 2016,
    },
    {
        _id: "6",
        fullname: "Sophia Williams",
        email: "sophia.williams@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/girl?lock=6",
        company: "Tesla",
        position: "Mechanical Engineer",
        graduationYear: 2021,
    },
    {
        _id: "7",
        fullname: "Daniel Martinez",
        email: "daniel.martinez@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/boy?lock=7",
        company: "IBM",
        position: "Software Architect",
        graduationYear: 2015,
    },
    {
        _id: "8",
        fullname: "Olivia Taylor",
        email: "olivia.taylor@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/woman,face?lock=8",
        company: "LinkedIn",
        position: "HR Manager",
        graduationYear: 2014,
    },
    {
        _id: "9",
        fullname: "William Anderson",
        email: "william.anderson@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/man,face?lock=9",
        company: "Netflix",
        position: "Marketing Strategist",
        graduationYear: 2013,
    },
    {
        _id: "10",
        fullname: "Isabella Thomas",
        email: "isabella.thomas@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/woman,portrait?lock=10",
        company: "Adobe",
        position: "Graphic Designer",
        graduationYear: 2022,
    },
    {
        _id: "11",
        fullname: "James Wilson",
        email: "james.wilson@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/man?lock=11",
        company: "Meta",
        position: "AI Engineer",
        graduationYear: 2012,
    },
    {
        _id: "12",
        fullname: "Mia Davis",
        email: "mia.davis@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/woman?lock=12",
        company: "Uber",
        position: "Project Manager",
        graduationYear: 2011,
    },
    {
        _id: "13",
        fullname: "Alexander Harris",
        email: "alex.harris@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/man?lock=13",
        company: "Airbnb",
        position: "Software Developer",
        graduationYear: 2020,
    },
    {
        _id: "14",
        fullname: "Charlotte White",
        email: "charlotte.white@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/woman?lock=14",
        company: "Snapchat",
        position: "Product Designer",
        graduationYear: 2017,
    },
    {
        _id: "15",
        fullname: "Benjamin Martin",
        email: "benjamin.martin@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/man?lock=15",
        company: "Spotify",
        position: "Machine Learning Engineer",
        graduationYear: 2018,
    },
    {
        _id: "16",
        fullname: "Amelia Clark",
        email: "amelia.clark@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/woman?lock=16",
        company: "Twitter",
        position: "Community Manager",
        graduationYear: 2019,
    },
    {
        _id: "17",
        fullname: "Lucas Scott",
        email: "lucas.scott@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/man?lock=17",
        company: "Pinterest",
        position: "UX Designer",
        graduationYear: 2016,
    },
    {
        _id: "18",
        fullname: "Lily Adams",
        email: "lily.adams@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/woman?lock=18",
        company: "Salesforce",
        position: "Business Analyst",
        graduationYear: 2021,
    },
    {
        _id: "19",
        fullname: "Henry Walker",
        email: "henry.walker@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/man?lock=19",
        company: "Oracle",
        position: "Backend Developer",
        graduationYear: 2015,
    },
    {
        _id: "20",
        fullname: "Grace Hall",
        email: "grace.hall@example.com",
        type: "Alumni",
        profileImg: "https://loremflickr.com/150/150/woman?lock=20",
        company: "IBM",
        position: "Technical Consultant",
        graduationYear: 2014,
    },
];
const Alumni = () => {
	const [alumni, setAlumni] = useState([]);
	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  const fetchAlumni = async () => {
		try {
		  const response = await axios.post("http://localhost:5000/alumni/", {
			criteria: { type: "Alumni" },
			projection: {},
		  });
		  setAlumni(response.data);
		} catch (error) {
		  console.error("Error fetching alumni:", error);
		  setAlumni(dummyAlumni);
		} finally {
		  setLoading(false);
		}
	  };
	  fetchAlumni();
	}, []);
  
	return (
	  <div className="p-6">
		<h2 className="text-3xl font-bold mb-4">Alumni Network</h2>
  
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
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{alumni.map((person) => (
			  <div key={person._id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
				<img
				  src={person.profileImg || "https://via.placeholder.com/150?text=Profile"}
				  alt="Profile"
				  className="w-14 h-14 rounded-full border-2 border-gray-300"
				/>
				<div>
				  <h3 className="text-lg font-semibold">{person.fullname}</h3>
				  <p className="text-gray-600">{person.email}</p>
				  <div className="flex items-center text-gray-500 mt-1">
					<School className="mr-1 text-blue-500" /> {person.graduationYear}
				  </div>
				  <div className="flex items-center text-gray-500 mt-1">
					<Work className="mr-1 text-green-500" /> {person.position} at {person.company}
				  </div>
				</div>
			  </div>
			))}
		  </div>
		)}
	  </div>
	);
  };
  
  export default Alumni;