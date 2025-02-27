import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; // Added useSelector
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Edit, Add, Delete } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FacultyClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState({});
  const [open, setOpen] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [clubData, setClubData] = useState({ name: "", description: "" });

  // Get user from Redux store
  const {user }= useSelector((state) => state.user);

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
    setClubData({ name: "", description: "" });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setClubData({ ...clubData, [e.target.name]: e.target.value });
  };

  // Handle Create/Edit Submission
  const handleSubmit = async () => {
    try {
      let response;
	  alert("submit form")
      if (editingClub) {
        // Edit Club
		console.log("editing")
        response = await axios.post("http://localhost:5000/club/clubupdate", {
          criteria: { _id: editingClub._id },
          updatedInfo: {
            $set: {
              name: clubData.name,
              description: clubData.description
            }
          }
        });
      } else {
        // Create Club with user._id from Redux
        response = await axios.post("http://localhost:5000/club/clubinsert", {
          name: clubData.name,
          description: clubData.description,
          createdBy: user._id // Using user._id from Redux store
        });
      }

      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchClubs();
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting club!");
      console.error("Error submitting club:", error);
    }
  };

  // Handle Delete Club
  const handleDelete = async (clubId) => {
    try {
      const response = await axios.post("http://localhost:5000/club/clubdelete", {
        criteria: { _id: clubId }
      });
      
      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchClubs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting club!");
      console.error("Error deleting club:", error);
    }
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
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingClub ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FacultyClubs;