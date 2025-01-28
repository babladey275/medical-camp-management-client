import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: registeredCamps = [], refetch } = useQuery({
    queryKey: ["registered-camps", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/registered-camps/${user.email}`);

        return res.data;
      }
    },
  });

  return (
    <div>
      <div className="overflow-x-auto rounded-t-lg">
        <table className="table">
          {/* head */}
          <thead className="bg-[#399ced] text-white">
            <tr>
              <th>#</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Participant Name</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {registeredCamps.map((camp, index) => (
              <tr key={camp._id}>
                <td>{index + 1}</td>
                <td>{camp.campName}</td>
                <td>{camp.fees}</td>
                <td>{camp.participantName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;
