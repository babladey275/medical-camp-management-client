import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageCamps = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: camps = [], refetch } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/camps/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "Your camp has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl text-center pb-6 font-semibold">
        Manage All Camps
      </h2>

      <div className="overflow-x-auto rounded-t-lg">
        <table className="table">
          {/* head */}
          <thead className="bg-[#399ced] text-white">
            <tr>
              <th>#</th>
              <th>Camp Name</th>
              <th>Healthcare Professional</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{camp.name}</td>
                <td className="font-semibold">{camp.healthCareProfessional}</td>
                <td>{camp.location}</td>
                <td>{camp.dateTime}</td>
                <td>
                  <Link
                    to={`/dashboard/manage-camps/update-camp/${camp._id}`}
                    className="btn btn-sm hover:bg-[#3986d7] bg-[#399ced]"
                  >
                    <FaRegEdit className="text-white" />
                  </Link>
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="btn btn-sm bg-[#d73030] hover:bg-[#942d2d]"
                  >
                    <FaRegTrashAlt className="text-white" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamps;
