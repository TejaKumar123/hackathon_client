import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    attachments: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Get user from Redux store
  const {user} = useSelector((state) => state.user);

  // Fetch all announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.post("http://localhost:5000/announcement/announcementfind", {
        criteria: {},
        projection: {
          title: 1,
          content: 1,
          author: 1,
          attachments: 1,
          createdAt: 1
        }
      });
      
      if (response.data.status === "ok") {
        setAnnouncements(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching announcements!");
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding/updating announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const attachmentArray = formData.attachments
        ? formData.attachments.split(",").map(url => url.trim()).filter(url => url !== "")
        : [];

      let response;
      if (editingId) {
        // Update existing announcement
        response = await axios.post("http://localhost:5000/announcement/announcementupdate", {
          criteria: { _id: editingId },
          updatedInfo: {
            $set: {
              title: formData.title,
              content: formData.content,
              attachments: attachmentArray,
            }
          }
        });
      } else {
		alert(user._id)
        // Add new announcement
        response = await axios.post("http://localhost:5000/announcement/announcementinsert", {
          title: formData.title,
          content: formData.content,
          attachments: attachmentArray,
          author: user._id
        });
      }

      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchAnnouncements();
        // Reset form
        setFormData({ title: "", content: "", attachments: "" });
        setEditingId(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting announcement!");
      console.error("Error submitting announcement:", error);
    }
  };

  // Handle deleting an announcement
  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/announcement/announcementdelete", {
        criteria: { _id: id }
      });
      
      if (response.data.status === "ok") {
        toast.success(response.data.message);
        await fetchAnnouncements();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting announcement!");
      console.error("Error deleting announcement:", error);
    }
  };

  // Handle editing an announcement (populate form)
  const handleEdit = (announcement) => {
    setEditingId(announcement._id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      attachments: announcement.attachments.join(", ")
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Manage Announcements</h2>

      {/* Form for Adding/Editing Announcements */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 mb-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Announcement" : "Add Announcement"}
        </h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mt-2"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mt-2"
          rows="4"
        />
        <input
          type="text"
          name="attachments"
          placeholder="Attachment URLs (comma-separated)"
          value={formData.attachments}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
        />
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", content: "", attachments: "" });
              }}
              className="ml-3 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold">{announcement.title}</h3>
            <p className="text-gray-600 mt-2">{announcement.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted by {announcement.author.fullName || announcement.author} on{" "}
              {new Date(announcement.createdAt).toLocaleDateString()}
            </p>

            {/* Attachments */}
            {announcement.attachments?.length > 0 && (
              <div className="mt-3">
                <h4 className="text-lg font-medium">Attachments:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {announcement.attachments.map((file, index) => (
                    <a
                      key={index}
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline"
                    >
                      View Attachment {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Edit & Delete Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(announcement)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(announcement._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;