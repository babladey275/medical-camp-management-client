import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProfileModal = ({ closeModal, name, email, image, phone, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      image: data.image,
      phone: data.phone,
    };

    const res = await axiosSecure.patch(`/users/${id}`, userInfo);
    // console.log(res.data);

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Profile
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-h-[80vh] overflow-y-auto pr-4" // This makes the form scrollable
        >
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              defaultValue={name}
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Input (disabled) */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              defaultValue={email}
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          {/* Profile Image URL Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Profile Image URL
            </label>
            <input
              type="text"
              defaultValue={image}
              {...register("image", {
                required: "Profile image URL is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.image && (
              <span className="text-red-500 text-xs">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Contact Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue={phone}
              {...register("phone", { required: "Phone Number is required" })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-error"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn hover:bg-[#3986d7] bg-[#399ced] text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
