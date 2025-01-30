import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const FeedbackModal = ({ closeModal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const feedback = {
      name: user?.displayName,
      details: data.feedback,
      rating: data.rating,
    };
    const res = await axiosSecure.post("/reviews", feedback);
    console.log(res.data);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Your feedback has been submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });
      closeModal();
    }
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center overflow-auto"
    >
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full sm:w-120 max-h-[90vh] flex flex-col">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Submit your Feedback
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              {...register("name")}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md "
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              {...register("rating", {
                required: "Rating is required",
                min: {
                  value: 1,
                  message: "Rating must be at least 1",
                },
                max: {
                  value: 5,
                  message: "Rating cannot be greater than 5",
                },
              })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Rate from 1 to 5"
            />
            {errors.rating && (
              <p className="text-red-500 text-xs">{errors.rating.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              {...register("feedback", { required: "Feedback is required" })}
              className="mt-1 p-2 w-full  h-32 border border-gray-300 rounded-md"
              placeholder="Write your feedback here"
            />
            {errors.feedback && (
              <p className="text-red-500 text-xs">{errors.feedback.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-error text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
