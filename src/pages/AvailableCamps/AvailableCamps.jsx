import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Cart from "./Cart";

const AvailableCamps = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <Cart key={camp._id} camp={camp}></Cart>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
