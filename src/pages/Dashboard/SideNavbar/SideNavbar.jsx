import { Link, NavLink } from "react-router-dom";
import {
  FaPlusCircle,
  FaListAlt,
  FaRegistered,
  FaChartBar,
  FaUserAlt,
  FaHistory,
  FaUserTie,
} from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";

const SideNavbar = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <ul className="space-y-4">
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
              <Link
                to="/manage-registered-camps"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaRegistered className="text-xl" />
                <span>Manage Registered Camps</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/analytics"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaChartBar className="text-xl" />
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/participant-profile"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaUserAlt className="text-xl" />
                <span>Participant Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/registered-camps"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaListAlt className="text-xl" />
                <span>Registered Camps</span>
              </Link>
            </li>
            <li>
              <Link
                to="/payment-history"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700"
              >
                <FaHistory className="text-xl" />
                <span>Payment History</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNavbar;
