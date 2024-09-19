import React, { useRef, useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from "../store/auth";
import { GraduationCap, User, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';


export default function Login() {
  const email = useRef('');
  const password = useRef('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (email.current.value === "" || password.current.value === "") {
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
      // Make an API request to the backend to login the user
      const response = await axios.post("https://college-management-backend-4zro.onrender.com/auth/login", {
        email: email.current.value,
        password: password.current.value
      });

      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      console.log(response.data);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("id",response.data.id);
      localStorage.setItem("role",response.data.role);
  
      // Check if login was successful
      if (response.status === 200) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        // Navigate to the dashboard after a delay
        setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      // Log error details for debugging
      console.error('Login error:', error);
  
      toast.error(
        `Login failed: ${error.response?.data?.message || error.message}`,
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
          <h2 className="text-4xl font-bold text-[hsl(0,0%,40%)] font-extrabold">CMS <span className='text-[hsl(271,76%,53%)]'>Login</span></h2>
          <p className="text-[hsl(0,0%,40%)] font-medium mb-6">Enter your credentials to access your content</p>
        </div>
        <form onSubmit={handleLogin} className='flex flex-col items-center justify-center'>
          <div className="space-y-4">
            <div className="relative">
              <input
                id="username"
                type="email"
                placeholder="Email"
                className="w-full pl-10 p-2 border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
                ref={email}
                autoComplete="username"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)]" />
            </div>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full pl-10 p-2 border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
                ref={password}
                autoComplete="current-password"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)]" />
            </div>
          </div>
          <button
            type="submit"
            className="w-[75%] mt-6 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
          >
            Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
        
      </div>
    </div>
  );
}
