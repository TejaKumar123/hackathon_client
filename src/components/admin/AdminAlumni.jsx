import { useEffect, useState } from "react";
import axios from "axios";
import { Work, School } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Alumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.post("http://localhost:5000/auth/getUserData", {
          criteria: { role: "alumni" },
          projection: {},
        });

        const { status, message, data } = response.data;

        if (status === "ok") {
          setAlumniData(data);
          toast.success(message || "Alumni data fetched successfully!");
        } else {
          toast.error(message || "Failed to fetch alumni data");
        }
      } catch (error) {
        console.error("Error fetching alumni:", error);
        toast.error(error.response?.data?.message || "An error occurred while fetching alumni data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Alumni Network</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(alumniData) && alumniData.length > 0 ? (
          alumniData.map((person) => (
            <div key={person._id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
              <img
                src={person?.profileImg || "https://via.placeholder.com/150?text=Profile"}
                alt="Profile"
                className="w-14 h-14 rounded-full border-2 border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold">{person.fullname}</h3>
                <p className="text-gray-600">{person.email}</p>
                <div className="flex items-center text-gray-500 mt-1">
                  <School className="mr-1 text-blue-500" /> {person?.graduationYear || 2015}
                </div>
                <div className="flex items-center text-gray-500 mt-1">
                  <Work className="mr-1 text-green-500" /> {person?.position || "frontend developer"} at {person?.company || "google"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No alumni data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;