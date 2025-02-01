import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mb-8">
        Payment History
      </h2>
      <div className="overflow-x-auto rounded-t-lg">
        <table className="table">
          <thead className="bg-[#399ced] text-white">
            <tr className="text-sm">
              <th>#</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Transaction Id</th>
              <th>Confirm Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.campName}</td>
                <td>${item.fees}</td>
                <td>{item.transactionId}</td>
                <td>{item.confirmStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
