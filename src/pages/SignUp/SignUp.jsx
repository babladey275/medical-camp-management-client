import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUp = () => {
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
          Create an Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="form-control mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full input input-bordered"
            />
            {errors.name && (
              <span className="text-red-500 mt-1">Name is required</span>
            )}
          </div>

          {/* Photo URL Field */}
          <div className="form-control mb-4">
            <label className="block text-sm font-medium mb-2">Photo URL</label>
            <input
              type="url"
              {...register("photoURL", { required: true })}
              placeholder="Enter your photo URL"
              className="w-full input input-bordered"
            />
            {errors.photoURL && (
              <span className="text-red-500 mt-1">Photo URL is required</span>
            )}
          </div>

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
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&*])/,
              })}
              name="password"
              placeholder="Enter your password"
              className="w-full input input-bordered"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 mt-1">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500 mt-1">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 mt-1">
                Password must include one uppercase letter, one lowercase
                letter, one number, and one special character.
              </p>
            )}
          </div>

          <button type="submit" className="w-full btn btn-neutral">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Go to Login
            </Link>
          </p>
          <div className="divider my-4">Or sign up with</div>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="btn btn-outline w-full">Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
