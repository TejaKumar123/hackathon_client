import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState({});

  // Fetch all clubs
  const fetchClubs = async () => {
    try {
      const response = await axios.post("http://localhost:5000/club/clubfind", {
        criteria: {},
        projection: {
          name: 1,
          description: 1,
          createdAt: 1
        }
      });
      
      if (response.data.status === "ok") {
        setClubs(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching clubs!");
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  // Handle Join Button Click
  const handleJoin = async (clubId) => {
    try {
      setJoinedClubs((prev) => ({
        ...prev,
        [clubId]: !prev[clubId],
      }));
      toast.success("Club join status updated!");
    } catch (error) {
      toast.error("Error updating join status!");
      console.error("Error joining club:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Clubs</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club._id} className="bg-white shadow-md rounded-lg p-4 relative">
            <h3 className="text-xl font-semibold">{club.name}</h3>
            <p className="text-gray-600">{club.description}</p>
            <button
              className={`mt-3 px-4 py-2 rounded ${
                joinedClubs[club._id] ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() => handleJoin(club._id)}
            >
              {joinedClubs[club._id] ? "Joined" : "Join"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;