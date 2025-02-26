import React, { useEffect, useState } from "react";
import axios from "axios";

// Dummy announcement data
const dummyAnnouncements = [
  {
    _id: "1",
    title: "Mid-Term Exam Schedule Released",
    content: "Mid-term exams will begin on March 15. Check the university portal for more details.",
    author: "Admin",
    postedAt: "2024-02-25",
    attachments: ["https://via.placeholder.com/150"],
  },
  {
    _id: "2",
    title: "Workshop on AI & Machine Learning",
    content: "A workshop on AI & ML will be conducted by industry experts. Register before March 10.",
    author: "Prof. John Doe",
    postedAt: "2024-02-22",
    attachments: [],
  },
  {
    _id: "3",
    title: "Sports Week Registration Open!",
    content: "Register now for the annual sports week and showcase your talent in various sports events.",
    author: "Student Council",
    postedAt: "2024-02-20",
    attachments: ["https://via.placeholder.com/150"],
  },
];

const FacultyAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(dummyAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/announcement/", {
          criteria: {},
          projection: {},
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setAnnouncements(dummyAnnouncements);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Filter and sort announcements
  const filteredAnnouncements = announcements
    .filter((announcement) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        announcement.title.toLowerCase().includes(searchLower) ||
        announcement.content.toLowerCase().includes(searchLower) ||
        announcement.author.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.postedAt) - new Date(a.postedAt);
      }
      return new Date(a.postedAt) - new Date(b.postedAt);
    });

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Announcements</h2>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest announcements
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search announcements..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-lg bg-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        // Announcements List
        <div className="space-y-6">
          {filteredAnnouncements.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No announcements found</p>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <div
                key={announcement._id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-200"
              >
                {/* Announcement Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {announcement.title}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    New
                  </span>
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-4">{announcement.content}</p>

                {/* Meta Information */}
                <div className="text-sm text-gray-500 mb-4">
                  <p>Posted by: {announcement.author}</p>
                  <p>
                    Date:{" "}
                    {new Date(announcement.postedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Attachments */}
                {announcement.attachments.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Attachments
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {announcement.attachments.map((file, index) => (
                        <a
                          key={index}
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-blue-600 transition-colors duration-200"
                        >
                          View Attachment {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyAnnouncements;