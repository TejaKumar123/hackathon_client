import React, { useEffect, useState } from "react";
import axios from "axios";

// Dummy data for fallback
const dummyDiscussions = [
  {
    _id: "1",
    title: "Upcoming Hackathon 2024!",
    content: "A national-level hackathon is coming up. Let's discuss strategies and team-building!",
    author: "Alice Johnson",
    category: "Event",
    createdAt: "2024-02-20",
  },
  {
    _id: "2",
    title: "AI & Robotics Club - Project Ideas",
    content: "What are some interesting AI projects we can work on as a club?",
    author: "Bob Smith",
    category: "Club",
    createdAt: "2024-02-18",
  },
  {
    _id: "3",
    title: "Internship Opportunities at Google",
    content: "Google is offering summer internships. Let's share tips and application details!",
    author: "Charlie Davis",
    category: "Opportunities",
    createdAt: "2024-02-15",
  },
];

const FacultyDiscussions = () => {
  const [discussions, setDiscussions] = useState(dummyDiscussions);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiscussions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/discussion/", {
          criteria: {},
          projection: {},
        });
        setDiscussions(response.data);
      } catch (error) {
        console.error("Error fetching discussions:", error);
        setDiscussions(dummyDiscussions);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscussions();
  }, []);

  // Filter discussions based on category and search term
  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesCategory =
      selectedCategory === "All" || discussion.category === selectedCategory;
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Event", "Club", "Opportunities"];

  const getCategoryColor = (category) => {
    switch (category) {
      case "Event":
        return "bg-green-100 text-green-800";
      case "Club":
        return "bg-blue-100 text-blue-800";
      case "Opportunities":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header and Search */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Faculty Discussions
        </h2>
        <input
          type="text"
          placeholder="Search discussions..."
          className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        // Discussions List
        <div className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No discussions found.
            </div>
          ) : (
            filteredDiscussions.map((discussion) => (
              <div
                key={discussion._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {discussion.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                      discussion.category
                    )}`}
                  >
                    {discussion.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{discussion.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Posted by {discussion.author}</span>
                  <span>
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Reply
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyDiscussions;