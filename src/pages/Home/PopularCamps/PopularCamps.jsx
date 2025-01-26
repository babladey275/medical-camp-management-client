import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaUserFriends } from "react-icons/fa";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();

  const { data: camps = [] } = useQuery({
    queryKey: ["camps", { limit: 6 }],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps", { params: { limit: 6 } });
      return res.data;
    },
  });

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-4xl text-center font-bold mb-8">
        Popular Medical Camps
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="card bg-base-100 shadow-md border border-gray-200"
          >
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

              <div className="mt-4 flex justify-between items-center">
                <p>
                  <span className="text-lg font-semibold mr-1">Fees:</span>
                  <span className="text-lg font-semibold">
                    {camp.fees === 0 ? "Free" : `$${camp.fees}`}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(camp.dateTime).toLocaleString()}
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <Link
                  to={`/camp-details/${camp._id}`}
                  className="btn hover:bg-[#3986d7] bg-[#399ced] w-full text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to={"/available-camps"}
          className="btn hover:bg-[#3986d7] bg-[#399ced] text-white"
        >
          See All Camps
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
