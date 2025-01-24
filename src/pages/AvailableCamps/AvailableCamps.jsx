import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cart from "./Cart";
import { useState } from "react";
import { FaTh, FaThList } from "react-icons/fa";

const AvailableCamps = () => {
  const axiosPublic = useAxiosPublic();
  const [sortBy, setSortBy] = useState("");
  const [layout, setLayout] = useState("three-columns");

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

  const toggleLayout = () => {
    setLayout((prevLayout) =>
      prevLayout === "three-columns" ? "two-columns" : "three-columns"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="py-8">
      <div>
        <div className="mb-4 flex items-center">
          {/* Sorting Dropdown */}
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

          {/* layout button */}
          <div className="hidden md:block">
            <button
              onClick={toggleLayout}
              className="btn bg-[#399ced] hover:bg-[#3986d7] text-white"
            >
              {layout === "three-columns" ? (
                <FaTh className="text-xl" />
              ) : (
                <FaThList className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 m-2 md:m-0 ${
          layout === "three-columns" ? "md:grid-cols-3" : "md:grid-cols-2"
        } gap-6`}
      >
        {camps.map((camp) => (
          <Cart key={camp._id} camp={camp}></Cart>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
