import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Edit, Add, Delete } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: ""
  });

  // Get user from Redux store
  const {user} = useSelector((state) => state.user);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.post("http://localhost:5000/event/eventfind", {
        criteria: {},
        projection: {
          name: 1,
          description: 1,
          date: 1,
          location: 1,
          createdBy: 1,
          createdAt: 1
        }
      });
      
      if (response.data.status === "ok") {
        setEvents(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching events!");
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Open Modal (For Create/Edit)
  const handleOpen = (event = null) => {
    setEditingEvent(event);
    setEventData(
      event 
        ? {
            name: event.name,
            description: event.description,
            date: new Date(event.date).toISOString().split('T')[0],
            location: event.location
          }
        : {
            name: "",
            description: "",
            date: "",
            location: ""
          }
    );
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
    setEventData({ name: "", description: "", date: "", location: "" });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle Create/Edit Submission
  const handleSubmit = async () => {
    try {
      let response;
      if (editingEvent) {
        // Edit Event
        response = await axios.post("http://localhost:5000/event/eventupdate", {
          criteria: { _id: editingEvent._id },
          updatedInfo: {
            $set: {
              name: eventData.name,
              description: eventData.description,
              date: new Date(eventData.date),
              location: eventData.location,
              updatedAt: new Date()
            }
          }
        });
      } else {
        // Create Event
        response = await axios.post("http://localhost:5000/event/eventinsert", {
          name: eventData.name,
          description: eventData.description,
          date: new Date(eventData.date),
          location: eventData.location,
          createdBy: user._id
        });
      }

      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchEvents();
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting event!");
      console.error("Error submitting event:", error);
    }
  };

  // Handle Delete Event
  const handleDelete = async (eventId) => {
    try {
      const response = await axios.post("http://localhost:5000/event/eventdelete", {
        criteria: { _id: eventId }
      });
      
      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchEvents();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting event!");
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Events</h2>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white shadow-md rounded-lg p-4 relative">
            <div className="absolute top-2 right-2 flex gap-2">
              <IconButton onClick={() => handleOpen(event)}>
                <Edit color="primary" />
              </IconButton>
              <IconButton onClick={() => handleDelete(event._id)}>
                <Delete color="error" />
              </IconButton>
            </div>
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p className="text-gray-600 mt-2">{event.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
              <p>Created: {new Date(event.createdAt).toLocaleDateString()}</p>
              <p>Created by: {event.createdBy.fullName || 'Unknown'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Event Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editingEvent ? "Edit Event" : "Create Event"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Event Name"
            type="text"
            fullWidth
            value={eventData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={eventData.description}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="date"
            label="Event Date"
            type="date"
            fullWidth
            value={eventData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={eventData.location}
            onChange={handleChange}
            required
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