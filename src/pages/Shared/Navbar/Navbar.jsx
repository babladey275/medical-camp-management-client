import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/icon/logo.png";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut();
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/available-camps"}>Available Camps</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#399ced] text-white rounded-t-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost hover:bg-white">
          <img src={logo} alt="" className="w-10" />
          <h2 className="md:text-2xl">Medical Camp</h2>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <p className="font-semibold text-center py-2 bg-gray-600 text-white mb-1">
                {user?.displayName}
              </p>
              <li>
                <Link to={"/dashboard"} className="text-black">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="text-black">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="btn btn-outline">Join Us</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
