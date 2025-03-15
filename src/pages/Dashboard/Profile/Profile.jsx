import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaEnvelope, FaPhoneAlt, FaUserAlt } from "react-icons/fa"; // Edit icon for button
import UpdateProfileModal from "./UpdateProfileModal";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: userData = null,
    isLoading,
    refetch,
  } = useQuery({
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        {/* Profile Picture Section */}
        <div className="">
          <img
            src={userData?.image || user?.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            className="w-40 h-40 rounded-full shadow-xl mb-4 transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* User Info Section */}
        <div className="space-y-4 w-full">
          {/* Name Field */}
          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
            <FaUserAlt className="text-[#3986d7]" />
            <p className="text-xl font-semibold text-gray-800">
              {userData?.name}
            </p>
          </div>

          {/* Email Field */}
          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
            <FaEnvelope className="text-[#3986d7]" />
            <p className="text-lg text-gray-600">{userData?.email}</p>
          </div>

          {/* Phone Field */}
          <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
            <FaPhoneAlt className="text-[#3986d7]" />
            <p className="text-lg text-gray-600">
              {userData?.phone || (
                <span className="text-red-600">Add Your Phone Number</span>
              )}
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleModalOpen}
          className="btn bg-[#3986d7] hover:bg-[#3075c0] text-white text-xl"
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
