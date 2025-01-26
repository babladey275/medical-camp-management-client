import { Outlet } from "react-router-dom";
import SideNavbar from "../SideNavbar/SideNavbar";
import Navbar from "../../Shared/Navbar/Navbar";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />

      <div className="flex">
        <SideNavbar />

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
