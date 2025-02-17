import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaLock, FaPersonCircleCheck, FaArrowLeft, FaUserPlus } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { hourglass } from 'ldrs';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


hourglass.register();

const Login = ({ closeModal }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        address: "",
        pincode: "",
        role: "individual", 
        phoneNumber: "",
        agreeToTerms: false
    });
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userData = { email: formData.email, password: formData.password };
    
        try {
            const response = await axios.post("/api/v1/auth/login", userData);
            console.log(response);
    
            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("userId", data.user._id);
                localStorage.setItem("userEmail", data.user.email);
                localStorage.setItem("userRole", data.user.role);
                localStorage.setItem("userName", data.user.name);
                toast.success("Logged in Successfully");
    
                setTimeout(() => {
                    if (data.user.role === "individual") {
                        navigate("/consumer");
                    } else if (data.user.role === "restaurant") {
                        navigate("/retailer");
                    } else if (data.user.role === "ngo") {
                        navigate("/ngo");
                    } else if (data.user.role === "volunteer") {
                        navigate("/volunteer");
                    }
                    closeModal();
                }, 3000);
            }
        } catch (error) {
            toast.error("Invalid Credentials");
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    };

    const registerHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("Register handler initiated");
        console.log("Form data:", formData);

        if (!formData.agreeToTerms) {
            console.log("Terms not agreed to");
            toast.error("Please agree to Terms & Conditions");
            setIsLoading(false);
            return;
        }

        console.log("Attempting registration request...");

        try {
            console.log("Attempting registration request...");
            const response = await axios.post("/api/v1/auth/register", formData);
            console.log("Registration response:", response);

            if (response.status === 201) {
                console.log("Registration successful");
                toast.success("Registration Successful!");
                setTimeout(() => {
                    console.log("Switching to login");
                    setIsLogin(true);
                }, 1000);
            }
        } catch (error) {
            console.error("Registration error:", error);
            console.log("Error response:", error.response);
            
            toast.error(error.response?.data?.message || "Registration Failed", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    };
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    
    if (isLoading) {
        
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <l-hourglass 
                flex items-center justify-center
                    size="100"
                    bg-opacity="0.1"
                    speed="1.75" 
                    color="white"
                ></l-hourglass>
            </div>
        );
    }
   

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl relative " data-aos="flip-left">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={closeModal}
                    className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none"
                >
                    <FaArrowLeft className="text-2xl" />
                </button>
            </div>

            <div className="flex flex-col items-center">
                {isLogin ? (
                    <FaPersonCircleCheck className="text-6xl mb-4 text-green-600 animate-bounce hover:scale-110 transition-transform duration-300" />
                ) : (
                    <FaUserPlus className="text-6xl mb-4 text-green-600 animate-bounce hover:scale-110 transition-transform duration-300" />
                )}
                <h2 className="text-4xl font-semibold mb-4 text-green-800">
                    {isLogin ? "Login" : "Register"}
                </h2>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-6 md:px-12">
    <form className="space-y-4" onSubmit={isLogin ? loginHandler : registerHandler}>

                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Phone Number:</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Address:</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your address"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Pincode:</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your pincode"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Role:</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="individual">Individual</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="ngo">NGO</option>
                                    <option value="volunteer">Volunteer</option>
                                </select>
                            </div>
                        </>
                    )}
                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {!isLogin && (
                        <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-green-600 rounded focus:ring-green-500 cursor-pointer"
                            />
                            <label className="text-sm text-gray-700 cursor-pointer select-none">
                                I agree to the <a href="#" className="text-green-600 hover:text-green-800 font-medium underline">Terms & Conditions</a> and <a href="#" className="text-green-600 hover:text-green-800 font-medium underline">Privacy Policy</a>
                            </label>
                        </div>
                    )}

                    {isLogin && (
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-black hover:text-black text-sm font-medium"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 flex justify-center items-center text-xl transform hover:scale-105 transition-all duration-300"
                    >
                        {isLogin ? (
                            <>
                                <FaLock className="mr-2" />
                                Login
                            </>
                        ) : (
                            <>
                                <FaUserPlus className="mr-2" />
                                Register
                            </>
                        )}
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-black hover:text-black text-sm font-medium hover:underline transition-all duration-300"
                        >
                            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                        </button>
                    </div>
                </form>
            </div>

            {showForgotPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-105">
                        <h3 className="text-2xl font-bold text-green-800 mb-4">Forgot Password</h3>
                        <p className="text-gray-600 mb-6">
                            Please contact the administrator at <span className="font-semibold">nourishai@gmail.com</span> to reset your password.
                        </p>
                        <button
                            onClick={() => setShowForgotPassword(false)}
                            className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer 
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Login;