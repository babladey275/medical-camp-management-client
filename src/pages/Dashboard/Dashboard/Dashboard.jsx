import { Link, Outlet } from "react-router-dom";
import SideNavbar from "../SideNavbar/SideNavbar";
import Navbar from "../../Shared/Navbar/Navbar";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import logo from "../../../assets/icon/logo.png";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Navbar for larger screens */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Navbar and Toggle Button */}
      <div className="flex justify-between items-center md:hidden bg-[#3986d7] text-white p-2">
        <div>
          <Link to={"/"} className="flex items-center gap-1 cursor-pointer">
            <img src={logo} alt="" className="w-5" />
            <h2 className="text-sm font-semibold">Medical Camp</h2>
          </Link>
        </div>
        <button
          onClick={toggleSidebar}
          className="mobile-menu-button p-2 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      <div className="md:flex">
        {/* Side Navbar for mobile and desktop */}
        <SideNavbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
