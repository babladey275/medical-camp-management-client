import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaEnvelope, FaPhoneAlt, FaUserAlt } from "react-icons/fa"; // Edit icon for button
import UpdateProfileModal from "./UpdateProfileModal";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData = null, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
      }
    },
  });

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    refetch();
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Your Profile</h1>
      </div>

      <div className="flex flex-col items-center space-y-4">
        {/* Profile Picture Section */}
        <div className="relative">
          <img
            src={userData?.image || user?.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-xl mb-4"
          />
        </div>

        {/* User Info Section */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUserAlt /> {userData?.name}
          </h2>
          <p className="text-gray-600 text-lg flex items-center gap-2">
            <FaEnvelope /> {userData?.email}
          </p>
          <p className="text-gray-600 text-lg flex items-center gap-2">
            <FaPhoneAlt />
            {userData?.phone || (
              <span className="text-red-600">Add Your Phone Number</span>
            )}
          </p>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleModalOpen}
          className="btn hover:bg-[#3986d7] bg-[#399ced] text-white text-xl"
        >
          <FaEdit className="mr-2" /> Update Profile
        </button>
      </div>

      {/* Modal for Editing Profile */}
      {isModalOpen && (
        <UpdateProfileModal
          closeModal={handleModalClose}
          id={userData?._id}
          name={userData?.name}
          email={userData?.email}
          phone={userData?.phone}
          image={userData?.image || user?.photoURL}
        />
      )}
    </div>
  );
};

export default Profile;
