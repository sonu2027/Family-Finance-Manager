import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../apiCall/registerUser.js";

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, otp: actualOtp, name, password, role } = location.state; // Get data from route state

    const [otp, setOtp] = useState(["", "", "", ""]); // State to store OTP digits
    const [isLoading, setIsLoading] = useState(false); // State to handle loading during registration

    // Handle input change for OTP boxes
    const handleInputChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus to the next input box
            if (value && index < 3) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    // Handle OTP verification
    const handleVerify = () => {
        console.log("hello");

        const enteredOtp = otp.join(""); // Combine OTP digits into a single string

        if (enteredOtp !== String(actualOtp)) {
            toast.error("Invalid OTP. Please try again.");
            return;
        }

        setIsLoading(true); // Start loading
        registerUser({ name, email, password, role })
            .then((res) => {
                toast.success("Registration successfull")
                setIsLoading(false); // Start loading
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            })
            .catch((error) => {
                toast.error("Registration failed")
            })
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
                <p className="text-center mb-6">
                    OTP has been sent to <span className="font-semibold">{email}</span>
                </p>

                {/* OTP Input Boxes */}
                <div className="flex justify-center space-x-4 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            maxLength={1}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    disabled={isLoading} // Disable button during loading
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Verifying..." : "Verify"}
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;