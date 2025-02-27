import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Announcements</h2>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;