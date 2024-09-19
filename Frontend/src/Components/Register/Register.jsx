import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {
  GraduationCap,
  User,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function Register() {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const role = useRef("");
  const [signVisible ,setSignVisible] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      name.current.value === "" ||
      email.current.value === "" ||
      password.current.value === "" ||
      role.current.value === ""
    ) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Make an API request to the backend to register the user
      const response = await axios.post("https://college-management-backend-4zro.onrender.com/auth/register", {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        role: role.current.value,
      });

      // If the response is successful, show a success message
      if (response.status === 201 || response.status === 200) {
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      toast.error(
        `Registration failed: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
      <ToastContainer />
      <div className="w-[350px] shadow-2xl bg-white p-6 rounded-lg">
        <div className="text-center">
          <GraduationCap className="w-6 h-6 inline-block mb-4 text-[hsl(0,0%,40%)] hover:text-[hsl(271,76%,53%)]" />
          <h2 className="text-4xl font-bold text-[hsl(0,0%,40%)] font-extrabold">
            CMS <span className="text-[hsl(271,76%,53%)]">Register</span>
          </h2>
          <p className="text-[hsl(0,0%,40%)] font-medium mt-1 mb-4">
            Create Student's account
          </p>
        </div>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center"
        >
          <div className="space-y-4">
            <div className="relative">
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 p-2 border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
                ref={name}
                autoComplete="name"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)]" />
            </div>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full pl-10 p-2 border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
                ref={email}
                autoComplete="email"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)]" />
            </div>
            <div className="relative">
              <input
                id="password"
                type={signVisible?"password":"text"}
                placeholder="Password"
                className="w-full pl-10 p-2 border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
                ref={password}
                autoComplete="current-password"
              />
              <FaEye className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)] cursor-pointer text-2xl ${signVisible?"hidden":"visible"} `} onClick={()=>setSignVisible(!signVisible)}/>
              <FaEyeSlash className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)] text-2xl ${signVisible?"visible":"hidden"} cursor-pointer`} onClick={()=>setSignVisible(!signVisible)}/>
              </div>
            <div className="relative">
              <select
                id="role"
                className="w-full pl-10 p-2 border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
                ref={role}
                defaultValue=""
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)]" />
            </div>
          </div>
          <button
            type="submit"
            className="w-[75%] mt-6 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
