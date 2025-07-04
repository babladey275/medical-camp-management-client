import { FaGoogle } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("users", userInfo).then((res) => {
        navigate(from, { replace: true });
      });
    });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline hover:bg-white hover:text-black w-full"
      >
        <FaGoogle /> Google
      </button>
    </div>
  );
};

export default SocialLogin;
