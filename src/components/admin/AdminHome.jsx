import { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [events, setEvents] = useState([]);
	const [clubs, setClubs] = useState([]);
	const [discussions, setDiscussions] = useState([]);

	// Dummy Data for Fallback
	const dummyAnnouncements = [
		{ _id: "1", title: "New Semester Begins", content: "The new semester starts on March 1st!" },
		{ _id: "2", title: "Library Timings", content: "The library will be open 24/7 during exams." }
	];

	const dummyEvents = [
		{ _id: "1", title: "Tech Fest 2025", description: "A festival for tech enthusiasts!" },
		{ _id: "2", title: "Entrepreneurship Summit", description: "Meet top startup founders!" }
	];

	const dummyClubs = [
		{ _id: "1", name: "AI & Robotics Club", description: "Explore AI, ML, and Robotics." },
		{ _id: "2", name: "Coding Club", description: "Solve problems and build projects!" }
	];

	const dummyDiscussions = [
		{ _id: "1", title: "AI in Education", content: "How can AI transform education?" },
		{ _id: "2", title: "Best Internship Platforms?", content: "Where to find good internships?" }
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch Announcements
				const announcementsRes = await axios.get("http://localhost:5000/announcements");
				setAnnouncements(announcementsRes.data.length > 0 ? announcementsRes.data : dummyAnnouncements);
			} catch (error) {
				console.error("Error fetching announcements:", error);
				setAnnouncements(dummyAnnouncements);
			}

			try {
				// Fetch Events
				const eventsRes = await axios.get("http://localhost:5000/events");
				setEvents(eventsRes.data.length > 0 ? eventsRes.data : dummyEvents);
			} catch (error) {
				console.error("Error fetching events:", error);
				setEvents(dummyEvents);
			}

			try {
				// Fetch Clubs
				const clubsRes = await axios.get("http://localhost:5000/clubs");
				setClubs(clubsRes.data.length > 0 ? clubsRes.data : dummyClubs);
			} catch (error) {
				console.error("Error fetching clubs:", error);
				setClubs(dummyClubs);
			}

			try {
				// Fetch Discussions
				const discussionsRes = await axios.get("http://localhost:5000/discussions");
				setDiscussions(discussionsRes.data.length > 0 ? discussionsRes.data : dummyDiscussions);
			} catch (error) {
				console.error("Error fetching discussions:", error);
				setDiscussions(dummyDiscussions);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold mb-4">Welcome to Your Student Dashboard</h2>

			{/* Announcements */}
			<section className="mb-6">
				<h3 className="text-2xl font-semibold mb-3">📢 Recent Announcements</h3>
				<div className="bg-white p-4 shadow-md rounded-lg">
					{announcements.slice(0, 3).map((announcement) => (
						<div key={announcement._id} className="border-b pb-2 mb-2">
							<h4 className="font-bold">{announcement.title}</h4>
							<p className="text-gray-600">{announcement.content}</p>
						</div>
					))}
				</div>
			</section>

			{/* Upcoming Events */}
			<section className="mb-6">
				<h3 className="text-2xl font-semibold mb-3">📅 Upcoming Events</h3>
				<div className="bg-white p-4 shadow-md rounded-lg">
					{events.slice(0, 3).map((event) => (
						<div key={event._id} className="border-b pb-2 mb-2">
							<h4 className="font-bold">{event.title}</h4>
							<p className="text-gray-600">{event.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Joined Clubs */}
			<section className="mb-6">
				<h3 className="text-2xl font-semibold mb-3">🏆 Your Joined Clubs</h3>
				<div className="bg-white p-4 shadow-md rounded-lg">
					{clubs.slice(0, 3).map((club) => (
						<div key={club._id} className="border-b pb-2 mb-2">
							<h4 className="font-bold">{club.name}</h4>
							<p className="text-gray-600">{club.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Latest Discussions */}
			<section className="mb-6">
				<h3 className="text-2xl font-semibold mb-3">💬 Latest Discussions</h3>
				<div className="bg-white p-4 shadow-md rounded-lg">
					{discussions.slice(0, 3).map((discussion) => (
						<div key={discussion._id} className="border-b pb-2 mb-2">
							<h4 className="font-bold">{discussion.title}</h4>
							<p className="text-gray-600">{discussion.content}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default AdminHome;
