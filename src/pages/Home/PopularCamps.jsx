import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cart from "../../components/Cart/Cart";
import { Link } from "react-router-dom";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();

  const { data: camps = [] } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps");
      return res.data;
    },
  });

  return (
    <div className="py-8">
      <h2 className="text-3xl text-center font-bold mb-8">
        Popular Medical Camps
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <Cart key={camp._id} camp={camp}></Cart>
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
