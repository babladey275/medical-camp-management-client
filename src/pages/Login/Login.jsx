import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);

    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User login successful!",
          showClass: {
            popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
          },
          hideClass: {
            popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`);
      });
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
          <div className="mt-4">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
