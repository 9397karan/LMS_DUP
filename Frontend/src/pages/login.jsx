import React, { useState } from "react";
import api from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import img from "../assets/loginimg.svg"; 
import  Spinner  from "../component/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/user/login", formData);
      setLoading(false);
      toast.success(data.message); 
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
console.log(data.user.role)
console.log(data.user)
      if (data.user.role === "admin") {
  navigate("/admin/dashboard");
  window.location.reload();
} else {
  navigate("/");
}
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || "Login failed. Please try again.");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  if(loading) return <Spinner/>;

  return user ? <Navigate to="/" /> : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left Side Image */}
        <div className="w-1/2 hidden lg:block bg-gradient-to-r from-blue-300 to-blue-500 ">
          <img src={img} alt="Illustration" className="w-full h-full object-cover" />
        </div>

        {/* Right Side Form */}
        <form className="w-full lg:w-1/2 p-8" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border mb-4 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border mb-4 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 rounded shadow-lg hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
