import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Events = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Events</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white shadow-md rounded-lg p-4 relative">
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
    </div>
  );
};

export default Events;