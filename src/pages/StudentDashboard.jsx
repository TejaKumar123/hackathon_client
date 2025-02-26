import { Outlet } from "react-router-dom";
import Sidebar from "../components/student/Sidebar";

const StudentDashboard = () => {
	return (
		<div className="flex h-screen overflow-auto">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content Area */}
			<div className="flex-1 p-6 bg-gray-100 h-[100%] overflow-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default StudentDashboard;
