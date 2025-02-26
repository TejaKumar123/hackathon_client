import axios from "axios";
import { useEffect, useState } from "react";

const defaultAvatar = "https://via.placeholder.com/150?text=Profile";

const dummyUser = {
	_id: "1234567890",
	username: "john_doe",
	fullname: "John Doe",
	email: "johndoe@example.com",
	role: "Student",
	type: "user",
	createdAt: "2024-02-26T12:00:00Z",
	updatedAt: "2024-02-26T12:00:00Z",
	profileImg: "https://randomuser.me/api/portraits/men/1.jpg"
};

const UserProfile = () => {
	const [user, setUser] = useState(null);
	const userId = "1234567890"; // Replace with actual user ID from auth context

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await axios.get(`http://localhost:5000/user/${userId}`);
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user profile:", error);
				setUser(dummyUser); // Use dummy data if API fails
			}
		};
		fetchUserProfile();
	}, []);

	if (!user) {
		return <p className="text-center text-gray-600">Loading user profile...</p>;
	}

	return (
		<div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 text-center">
			<img
				src={user.profileImg || defaultAvatar}
				alt="User Profile"
				className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
			/>
			<h2 className="text-2xl font-semibold mt-3">{user.fullname || "User"}</h2>
			<p className="text-gray-600">@{user.username}</p>
			<p className="text-gray-500">{user.email}</p>
			<span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-800">
				{user.role.toUpperCase()}
			</span>
		</div>
	);
};

export default UserProfile;
