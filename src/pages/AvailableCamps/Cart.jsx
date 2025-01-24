import { FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";

const Cart = ({ camp }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-gray-200">
      <figure>
        <img
          src={camp.image}
          alt={camp.name}
          className="w-full h-64 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold">{camp.name}</h2>
        <p className="text-gray-600">{camp.healthCareProfessional}</p>

        <p className="flex items-center space-x-2 text-sm text-gray-500">
          <FaMapMarkerAlt />
          <span>{camp.location}</span>
        </p>

        <p className="flex items-center space-x-2 text-sm text-gray-500">
          <FaUserFriends />
          <span>{camp.participantCount} Participants</span>
        </p>

        <p>
          <span className="font-semibold mr-1">Date & Time: </span>
          <span className="text-sm text-gray-500">
            {new Date(camp.dateTime).toLocaleString()}
          </span>
        </p>

        <p className="text-gray-700">{camp.description}</p>

        <div className="mt-4 flex justify-center">
          <button className="btn hover:bg-[#3986d7] bg-[#399ced] w-full text-white">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
