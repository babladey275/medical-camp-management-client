import { useForm } from "react-hook-form";

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-2xl bg-base-200 mx-auto p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Add a Camp</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Camp Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Camp Name</label>
          <input
            type="text"
            {...register("campName", { required: "Camp Name is required" })}
            className="w-full p-3 bg-white text-gray-800 rounded-lg border-2"
          />
          {errors.campName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.campName.message}
            </p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 text-sm font-medium">Image</label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="w-full p-3 bg-white text-gray-800 rounded-lg border-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Camp Fees */}
        <div>
          <label className="block mb-2 text-sm font-medium">Camp Fees</label>
          <input
            type="number"
            {...register("campFees", {
              required: "Camp Fees is required",
              min: { value: 0, message: "Fees cannot be negative" },
            })}
            className="w-full p-3 bg-white text-gray-800 rounded-lg border-2"
          />
          {errors.campFees && (
            <p className="text-red-500 text-sm mt-1">
              {errors.campFees.message}
            </p>
          )}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block mb-2 text-sm font-medium">Date & Time</label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: "Date & Time is required" })}
            className="w-full p-3 bg-white text-gray-800 rounded-lg border-2"
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateTime.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 text-sm font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full p-3 bg-white text-gray-800 rounded-lg border-2"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Healthcare Professional Name */}
        <div>
          <label
            className="block mb-2 text-sm font-medium"
            htmlFor="healthcareName"
          >
            Healthcare Professional Name
          </label>
          <input
            type="text"
            {...register("healthcareName", {
              required: "Healthcare Professional Name is required",
            })}
            className="w-full p-3 bg-white text-gray-800 rounded-lg border-2"
          />
          {errors.healthcareName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.healthcareName.message}
            </p>
          )}
        </div>

        {/* Participant Count */}
        <div>
          <label
            className="block mb-2 text-sm font-medium"
            htmlFor="participantCount"
          >
            Participant Count
          </label>
          <input
            type="number"
            defaultValue={0}
            {...register("participantCount", {
              required: "Participant Count is required",
            })}
            className="w-full p-3 bg-white text-gray-800 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all"
            disabled
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block mb-2 text-sm font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-3 bg-white text-gray-800 rounded-lg border-2"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="btn hover:bg-[#3986d7] bg-[#399ced] text-white w-full"
          >
            Add Camp
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
