import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: registeredCamps = [], refetch } = useQuery({
    queryKey: ["registered-camps", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/registered-camps/${user.email}`);

        return res.data;
      }
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/registered-camps/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Your registered camp has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handlePay = (camp) => {
    navigate("/dashboard/payment", { state: { camp } });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-8">
        Manage Your Registered Camps
      </h2>
      <div className="overflow-x-auto rounded-t-lg">
        <table className="table">
          <thead className="bg-[#399ced] text-white">
            <tr className="text-sm">
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
                <td>
                  {camp?.paymentStatus ? (
                    <button
                      disabled
                      className="btn btn-sm disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white"
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePay(camp)}
                      className="btn hover:bg-[#3986d7] bg-[#277dc3] text-white"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>
                  {camp?.confirmStatus ? (
                    "Confirmed"
                  ) : (
                    <p className="font-semibold">Pending</p>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(camp._id);
                    }}
                    className="btn btn-error btn-sm"
                  >
                    X
                  </button>
                </td>
                <td>
                  <button className="btn btn-sm bg-gradient-to-r from-[#389ba8] to-[#2578bc] text-white font-medium rounded-lg px-6 py-2 shadow-md duration-200 ease-in-out">
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;
