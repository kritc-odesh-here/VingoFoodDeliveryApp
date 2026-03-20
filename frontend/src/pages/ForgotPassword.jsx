import axios from "axios";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
// import { set } from "mongoose";

//flex item-center items-center justify-center min-h-screen

function ForgotPassword() {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true },
      );
      console.log(result);
      setError("");
      setStep(2);
      setLoading(false);
    } catch (error) {
      setError(
        `*${error?.response?.data?.message}` ||
          "An error occurred during sign up",
      );
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true },
      );
      console.log(result);
      setError("");
      setStep(3);
      setLoading(false);
    } catch (error) {
      setError(
        `*${error?.response?.data?.message}` ||
          "An error occurred during sign up",
      );
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Password and confirm password does not match");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newPassword,
        },
        { withCredentials: true },
      );
      console.log(result);
      setError("");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setError(
        `*${error?.response?.data?.message}` ||
          "An error occurred during sign up",
      );
      setLoading(false);
    }
  };

  return (
    <div
      className="flex w-full item-center items-center justify-center min-h-screen p-4
  bg-[#fff9f6]"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {step === 1 && (
          <div>
            {/* email */}
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg py-2 px-3 focus:outline-none"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className={`w-full max-w-md mt-6 py-2 rounded-lg bg-[#ff4d2d] text-white font-medium transition-colors hover:bg-[#e64323] cursor-pointer`}
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="White" /> : "Send Otp"}
            </button>
            <p className="text-red-500 text-center text-sm my-[10px] mt-2">
              {error}
            </p>
          </div>
        )}
        {step === 2 && (
          <div>
            {/* Enter OTP */}
            <div className="mb-2">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-2"
              >
                Enter OTP
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg py-2 px-3 focus:outline-none"
                placeholder="Enter your OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className={`w-full max-w-md mt-6 py-2 rounded-lg bg-[#ff4d2d] text-white font-medium transition-colors hover:bg-[#e64323] cursor-pointer`}
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="White" /> : "Verify OTP"}
            </button>
            <p className="text-red-500 text-center text-sm my-[10px] mt-2">
              {error}
            </p>
          </div>
        )}
        {step === 3 && (
          <div>
            {/* new password  */}
            <div className="mb-2">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                New Password
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg py-2 px-3 focus:outline-none"
                placeholder="Enter your new password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="ConfirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg py-2 px-3 focus:outline-none"
                placeholder="Confirm your new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button
              className={`w-full max-w-md mt-6 py-2 rounded-lg bg-[#ff4d2d] text-white font-medium transition-colors hover:bg-[#e64323] cursor-pointer`}
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={20} color="White" />
              ) : (
                "Reset Password"
              )}
            </button>
            <p className="text-red-500 text-center text-sm my-[10px] mt-2">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
