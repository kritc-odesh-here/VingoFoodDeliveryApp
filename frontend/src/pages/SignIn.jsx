import React from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice";

function SignIn() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(setUserData(result.data));
      setError("");
      setLoading(false);
    } catch (error) {
      setError(
        `*${error?.response?.data?.message}` ||
          "An error occurred during sign in",
      );
      setLoading(false);
    }
  };
  const handleGoogleaAuth = async () => {
    const provider = new GoogleAuthProvider();
    // shows a popup to select google account and then sign in with that account
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.error("Google authentication error:", error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-x1 shadow-lg w-full max-w-md p-8`}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Sign In your account to get delicious food deliveries..
        </p>
        {/* {email} */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="text"
            className="w-full border rounded-lg py-2 px-3 focus:outline-none"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        {/* {password} */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border rounded-lg py-2 px-3 focus:outline-none pr-10 focus:border-orange-500"
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[14px] cursor-pointer text-sm text-gray-500 hover:text-orange-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <LuEye /> : <LuEyeOff />}
            </button>
          </div>
        </div>
        <div
          className="text-right mb-1 text-[#ff4d2d] font-medium cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password
        </div>
        <button
          className={`w-full max-w-md mt-6 py-2 rounded-lg bg-[#ff4d2d] text-white font-medium transition-colors hover:bg-[#e64323] cursor-pointer`}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="White" /> : "Sign In"}
        </button>
        <p className="text-red-500 text-center text-sm my-[10px] mt-2">
          {error}
        </p>
        <button
          className={`w-full max-w-md mt-4 px-4 py-2 rounded-lg border border-gray-300 transition-duration-200 hover:bg-gray-200 text-gray-700 font-medium transition-colors hover:bg-gray-100 cursor-pointer flex items-center justify-center gap-2`}
          onClick={handleGoogleaAuth}
        >
          <FcGoogle size={20} /> <span>Sign in with Google</span>
        </button>
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Want to create a new account?
          <span className="text-orange-500 font-medium">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
