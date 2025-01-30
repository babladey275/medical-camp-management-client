import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const JoinCampModal = ({
  closeModal,
  id,
  name,
  fees,
  location,
  healthCareProfessional,
  updateParticipantCount,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const registerCamps = {
      campId: id,
      campName: name,
      fees: fees,
      location: location,
      healthcareName: healthCareProfessional,
      participantName: user?.displayName,
      participantEmail: user?.email,
      age: Number(data.age),
      phone: data.phoneNumber,
      gender: data.gender,
      emergencyContact: data.emergencyContact,
    };
    const res = await axiosSecure.post("/registered-camps", registerCamps);

    if (res.data.insertedId) {
      updateParticipantCount();
      Swal.fire({
        title: "Success!",
        text: "You have successfully joined the camp.",
        icon: "success",
        confirmButtonText: "OK",
      });
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full sm:w-120 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl text-center font-semibold mb-6 text-gray-800">
          Join the Camp
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 overflow-y-auto"
        >
          {/* Read-only Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-800">
                Camp Name
              </label>
              <input
                type="text"
                value={name}
                readOnly
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800">
                Camp Fees
              </label>
              <input
                type="text"
                value={fees === 0 ? "Free" : `$${fees}`}
                readOnly
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800">
                Location
              </label>
              <input
                type="text"
                value={location}
                readOnly
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800">
                Healthcare Professional
              </label>
              <input
                type="text"
                value={healthCareProfessional}
                readOnly
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Participant Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-800">
                Participant Name
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800">
                Participant Email
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="mt-2 p-4 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Age
                </label>
                <input
                  type="number"
                  {...register("age", { required: true })}
                  className="mt-2 p-4 border border-gray-300 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">Age is required</p>
                )}
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  className="mt-2 p-4 border border-gray-300 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Gender
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="mt-2 p-4 border border-gray-300 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  {...register("emergencyContact", {
                    required: "Emergency contact is required",
                  })}
                  className="mt-2 p-4 border border-gray-300 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500"
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-sm">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-error"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn hover:bg-[#3986d7] bg-[#399ced] text-lg text-white"
            >
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinCampModal;
