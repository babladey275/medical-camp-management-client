import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Cart from "../Cart/Cart";
import { useState } from "react";
import { FaTh, FaThList } from "react-icons/fa";

const AvailableCamps = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [layout, setLayout] = useState("three-columns");

  const { data: camps = [] } = useQuery({
    queryKey: ["camps", sortBy, search],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps", {
        params: { sortBy, search },
      });
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

  return (
    <div className="py-4 md:py-8">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-6">
        <div className="flex items-center flex-grow ml-2">
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

        {/* search */}
        <div className="flex-grow">
          <label className="input input-bordered flex items-center gap-2 max-w-xl">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="grow w-full"
              placeholder="Search by name or location"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
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
