import React, { useEffect, useState } from "react";
import axios from "axios";

const dummyAnnouncements = [
  {
    _id: "1",
    title: "Semester Exams Schedule Released",
    content: "The final semester exams will start from 10th March. Check the official university website for details.",
    author: "Admin",
    postedAt: "2024-02-25",
    category: "Academic",
    attachments: ["https://via.placeholder.com/150"]
  },
  {
    _id: "2",
    title: "New Research Funding Opportunities",
    content: "Students interested in AI research can apply for the university's new research funding program.",
    author: "Prof. John Doe",
    postedAt: "2024-02-22",
    category: "Research",
    attachments: []
  },
  {
    _id: "3",
    title: "Campus Festival Registration Open!",
    content: "Join us for the annual campus festival filled with cultural events, music, and sports!",
    author: "Student Council",
    postedAt: "2024-02-20",
    category: "Cultural",
    attachments: ["https://via.placeholder.com/150"]
  }
];

const FacultyEvents = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setTimeout(() => {
      setAnnouncements(dummyAnnouncements);
      setIsLoading(false);
    }, 1000);
  }, []);

  const categories = ["All", "Academic", "Research", "Cultural"];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "Academic": return "bg-blue-100 text-blue-800";
      case "Research": return "bg-green-100 text-green-800";
      case "Cultural": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Faculty Events</h1>
        <p className="text-gray-600">Stay updated with the latest events and announcements</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No events found matching your criteria</p>
          </div>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {announcement.title}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(announcement.category)}`}>
                    {announcement.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {announcement.content}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {announcement.author}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(announcement.postedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {announcement.attachments.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-semibold text-sm text-gray-700 mb-2">Attachments:</p>
                    <div className="flex flex-wrap gap-2">
                      {announcement.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-blue-600 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          Attachment {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FacultyEvents;