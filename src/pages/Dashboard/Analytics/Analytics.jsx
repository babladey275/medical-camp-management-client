import { FaDollarSign, FaCoins, FaRegBuilding } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Chart from "./Chart";

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: statData, isLoading } = useQuery({
    queryKey: ["participant-stat", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/participant-stat/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const { totalRegisteredCamps, totalPaymentNum, totalPayment, chartData } =
    statData || {};
  return (
    <div>
      <div className="mt-12">
        {/* Small Cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 flex-grow">
          {/* Total Payment */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-500 to-orange-500 text-white shadow-yellow-500/40`}
            >
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Payment
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ${totalPayment}
              </h4>
            </div>
          </div>

          {/* Number of Payments */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-500 to-teal-500 text-white shadow-blue-500/40`}
            >
              <FaCoins className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Number of Payments
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalPaymentNum}
              </h4>
            </div>
          </div>

          {/* Total Registered Camps */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-purple-500 to-pink-400 text-white shadow-purple-500/40`}
            >
              <FaRegBuilding className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Registered Camps
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {totalRegisteredCamps}
              </h4>
            </div>
          </div>
        </div>

        {/* Chart here.. */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-x-auto xl:col-span-2">
          <Chart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
