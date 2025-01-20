import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 my-8 md:p-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Login your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="form-control mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full input input-bordered"
            />
            {errors.email && (
              <span className="text-red-500 mt-1">Email is required</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-control mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
              })}
              placeholder="Enter your password"
              className="w-full input input-bordered"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 mt-1">Password is required</p>
            )}
          </div>

          <button type="submit" className="w-full btn btn-neutral">
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/signup" className="font-bold hover:underline">
              Go to Sign Up
            </Link>
          </p>
          <div className="divider my-4">Or Login with</div>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="btn btn-outline w-full">Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
