import { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaRegMoneyBillAlt,
  FaRegUser,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import JoinCampModal from "../../components/JoinCampModal/JoinCampModal";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CampDetails = () => {
  const {
    name,
    image,
    fees,
    dateTime,
    location,
    healthCareProfessional,
    participantCount,
    description,
  } = useLoaderData();

  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinCamp = () => {
    if (!user) {
      Swal.fire({
        title: "You are not logged in.",
        text: "Please login to join this camp.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-4 md:py-10">
      <div className="max-w-6xl mx-auto p-6 rounded-xl bg-white shadow-xl space-y-6">
        {/* Camp Image */}
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-64 md:h-96 object-center"
          />
        </div>

        {/* Camp Details */}
        <div className="space-y-6">
          {/* Camp Title and Description */}
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold">{name}</h1>
            <p className="text-lg text-gray-600 mt-2">{description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Date & Time */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-3">
              <FaCalendarAlt size={24} className="text-purple-600" />
              <div>
                <p className="font-semibold text-lg">Date & Time</p>
                <p>{dateTime}</p>
              </div>
            </div>
            {/* Location */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-3">
              <FaMapMarkedAlt size={24} className="text-indigo-600" />
              <div>
                <p className="font-semibold text-lg">Location</p>
                <p>{location}</p>
              </div>
            </div>
            {/* Health Care Professional */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-3">
              <FaUserMd size={24} className="text-green-600" />
              <div>
                <p className="font-semibold text-lg">
                  Health Care Professional
                </p>
                <p>{healthCareProfessional}</p>
              </div>
            </div>
            {/* Participant Count */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-3">
              <FaUsers size={24} className="text-blue-600" />
              <div>
                <p className="font-semibold text-lg">Participants</p>
                <p>{participantCount}</p>
              </div>
            </div>
            {/* Camp Fees */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-3">
              <FaRegMoneyBillAlt size={24} className="text-yellow-500" />
              <div>
                <p className="font-semibold text-lg">Camp Fees</p>
                <p>{fees === 0 ? "Free" : `$${fees}`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <div className="flex justify-center">
          <button
            onClick={handleJoinCamp}
            className="btn hover:bg-[#3986d7] bg-[#399ced] text-white"
          >
            <FaRegUser size={20} />
            <span className="font-semibold">Join Camp</span>
          </button>
        </div>
      </div>

      {/* modal */}
      {isModalOpen && (
        <JoinCampModal
          closeModal={closeModal}
          name={name}
          fees={fees}
          location={location}
          healthCareProfessional={healthCareProfessional}
        ></JoinCampModal>
      )}
    </div>
  );
};

export default CampDetails;
