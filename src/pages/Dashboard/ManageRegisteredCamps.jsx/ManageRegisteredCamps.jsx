import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();

  const { data: registeredCamps = [], refetch } = useQuery({
    queryKey: ["registered-camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registered-camps");
      return res.data;
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
            text: "Registered camp has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleConfirm = async (camp) => {
    const res = await axiosSecure.patch(`/registered-camps/${camp._id}`, {
      confirmStatus: "Confirmed",
    });
    console.log(res.data);

    if (res.data.result.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Confirmed successful!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-8">
        Manage All Registered Camps
      </h2>
      <div className="overflow-x-auto rounded-t-lg">
        <table className="table">
          <thead className="bg-[#399ced] text-white">
            <tr className="text-sm">
              <th>#</th>
              <th>Participant Name</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Payment Status</th>
              <th>Confirmation Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {registeredCamps.map((camp, index) => (
              <tr key={camp._id}>
                <td>{index + 1}</td>
                <td>{camp.participantName}</td>
                <td>{camp.campName}</td>
                <td>${camp.fees}</td>
                <td>{camp?.paymentStatus ? camp.paymentStatus : "Unpaid"}</td>
                <td>
                  {camp?.confirmStatus ? (
                    "Confirmed"
                  ) : (
                    <button
                      onClick={() => {
                        handleConfirm(camp);
                      }}
                      className="btn btn-sm font-semibold"
                    >
                      Pending
                    </button>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
