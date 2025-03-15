import { NavLink } from "react-router-dom";
import {
  FaPlusCircle,
  FaListAlt,
  FaRegistered,
  FaUserAlt,
  FaChartBar,
  FaHistory,
  FaUserTie,
} from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const SideNavbar = ({ isOpen, toggleSidebar }) => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) return <LoadingSpinner />;

  return (
    <div
      className={`z-20 fixed top-0 left-0 bg-gray-800 text-white w-64 min-h-screen space-y-6 p-4 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-full"
      }`}
      onClick={toggleSidebar}
    >
      <ul className="space-y-4">
        {/* Admin Links */}
        {isAdmin ? (
          <>
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-gray-700 p-2 font-bold flex items-center space-x-2 rounded-lg"
                    : "flex space-x-2 items-center p-2 rounded-lg hover:bg-gray-700"
                }
              >
                <FaUserTie className="text-xl" />
                <span>Organizer Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-camp"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-gray-700 p-2 font-bold flex items-center space-x-2 rounded-lg"
                    : "flex space-x-2 items-center p-2 rounded-lg hover:bg-gray-700"
                }
              >
                <FaPlusCircle className="text-xl" />
                <span>Add A Camp</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-camps"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-gray-700 p-2 font-bold flex items-center space-x-2 rounded-lg"
                    : "flex space-x-2 items-center p-2 rounded-lg hover:bg-gray-700"
                }
              >
                <FaListAlt className="text-xl" />
                <span>Manage Camps</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-registered-camps"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-gray-700 p-2 font-bold flex items-center space-x-2 rounded-lg"
                    : "flex space-x-2 items-center p-2 rounded-lg hover:bg-gray-700"
                }
              >
                <FaRegistered className="text-xl" />
                <span>Manage Registered Camps</span>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            {/* Participant Links */}
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-gray-700 p-2 font-bold flex items-center space-x-2 rounded-lg"
                    : "flex space-x-2 items-center p-2 rounded-lg hover:bg-gray-700"
                }
              >
                <FaUserAlt className="text-xl" />
                <span>Participant Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-gray-700 p-2 font-bold flex items-center space-x-2 rounded-lg"
                    : "flex space-x-2 items-center p-2 rounded-lg hover:bg-gray-700"
                }
              >
                <FaChartBar className="text-xl" />
                <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/registered-camps"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-gray-700 p-2 font-bold flex items-center space-x-2 rounded-lg"
                    : "flex space-x-2 items-center p-2 rounded-lg hover:bg-gray-700"
                }
              >
                <FaListAlt className="text-xl" />
                <span>Registered Camps</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-gray-700 p-2 font-bold flex items-center space-x-2 rounded-lg"
                    : "flex space-x-2 items-center p-2 rounded-lg hover:bg-gray-700"
                }
              >
                <FaHistory className="text-xl" />
                <span>Payment History</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNavbar;
