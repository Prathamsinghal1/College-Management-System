import { Book, Calendar, GraduationCap, Mail, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authActions } from '../store/auth';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://college-management-backend-4zro.onrender.com/auth/${localStorage.getItem('id')}`);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error('Failed to load user data');
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-red-200 p-8 flex flex-col items-center">
      <ToastContainer />
      <div className="max-w-4xl min-w-[71%] mx-auto overflow-hidden shadow-lg rounded-lg">
        <div className="md:flex bg-white rounded-lg">
          <div className="md:w-1/3 bg-purple-100 p-6 flex flex-col items-center justify-between border-r border-purple-200 min-h-[94vh]">
            <div className="w-32 h-32 border-4 border-white shadow-lg rounded-full overflow-hidden">
              <img src={userData.avatar || "/placeholder.svg"} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-purple-800">{userData.name}</h1>
            <div className="min-w-[30%] bg-gradient-to-br from-green-500 to-yellow-600 shadow-md duration-300 ease-in-out transition-all transform hover:scale-105 text-white py-1 px-4 rounded-[30px] flex items-center justify-center">
              <div className="text-sm">
                {localStorage.getItem('role').charAt(0).toUpperCase() + localStorage.getItem('role').slice(1).toLowerCase()}
              </div>
            </div>
            <div className="mt-6 space-y-2 text-center">
              <p className="flex items-center justify-center text-sm text-purple-700">
                <Mail className="w-4 h-4 mr-2" />
                {userData.email}
              </p>
              <p className="flex items-center justify-center text-sm text-purple-700">
                <Phone className="w-4 h-4 mr-2" />
                {userData.phoneNo || "(555) 123-4567"}
              </p>
            </div>
            <button
              className="min-w-[70%] bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 shadow-md duration-300 ease-in-out transition-all transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
              onClick={() => {
                dispatch(authActions.logout());
                dispatch(authActions.changeRole("user"));
                localStorage.clear();
                navigate("/");
              }}
            >
              LogOut
              <FaSignOutAlt className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="md:w-2/3 p-6 min-h-[90vh]">
            {/* Conditionally show admin statistics if role is admin */}
            {localStorage.getItem('role') === 'admin' && <>
              <div className="border rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-lg font-semibold">Admin Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold">1,234</h3>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold">56</h3>
                    <p className="text-sm text-gray-600">New Users (Last 7 days)</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <h3 className="text-2xl font-bold">98%</h3>
                    <p className="text-sm text-gray-600">System Uptime</p>
                  </div>
                </div>
              </div>
            

              <div className="border rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Updated user permissions for Marketing team</span>
                    <span className="ml-auto text-xs text-gray-500">2 hours ago</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Reviewed and approved new content guidelines</span>
                    <span className="ml-auto text-xs text-gray-500">Yesterday</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Deployed system update v2.1.0</span>
                    <span className="ml-auto text-xs text-gray-500">3 days ago</span>
                  </li>
                </ul>
              </div>
              </>}
          </div>
          </div>
              
      </div>
      <div className="min-w-[71%] bg-purple-50 p-6 mt-6 rounded-lg shadow-md">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm text-purple-700">Last Updated: Sep 15, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
