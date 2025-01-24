import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cart from "./Cart";
import { useState } from "react";

const AvailableCamps = () => {
  const axiosPublic = useAxiosPublic();
  const [sortBy, setSortBy] = useState("participantCount");

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ["camps", sortBy],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps", { params: { sortBy } });
      return res.data;
    },
  });

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="py-8">
      <div>
        {/* Sorting Dropdown */}
        <div className="mb-4 flex">
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-[#399ced] hover:bg-[#3986d7] text-white m-1"
            >
              Sort By
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <button onClick={() => handleSortChange("participantCount")}>
                  Most Registered
                </button>
              </li>
              <li>
                <button onClick={() => handleSortChange("fees")}>
                  Camp Fees
                </button>
              </li>
              <li>
                <button onClick={() => handleSortChange("name")}>
                  Alphabetical (Name)
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <Cart key={camp._id} camp={camp}></Cart>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
