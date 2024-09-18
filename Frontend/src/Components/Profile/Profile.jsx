import { Book, Calendar, GraduationCap, Mail, Pencil, PencilIcon, Phone, Star, Users } from "lucide-react";
import { useSelector } from "react-redux";

export default function Profile() {

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-red-200 p-8">
      <div className="max-w-4xl mx-auto overflow-hidden shadow-lg rounded-lg">
        <div className="md:flex bg-white rounded-lg">
          <div className="md:w-1/3 bg-purple-100 p-6 flex flex-col items-center justify-center border-r border-purple-200">
            <div className="w-32 h-32 border-4 border-white shadow-lg rounded-full overflow-hidden">
              <img src="/placeholder.svg?height=128&width=128" alt="Sarah Johnson" className="w-full h-full object-cover" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-purple-800">Sarah Johnson</h1>
            <div className="mt-6 space-y-2 text-center">
              <p className="flex items-center justify-center text-sm text-purple-700">
                <Mail className="w-4 h-4 mr-2" />
                sarah.johnson@university.edu
              </p>
              <p className="flex items-center justify-center text-sm text-purple-700">
                <Phone className="w-4 h-4 mr-2" />
                (555) 123-4567
              </p>
            </div>
          </div>
          <div className="md:w-2/3 p-6 min-h-[90vh]">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-2 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Academic Information
              </h2>
              <p className="text-purple-700">Major: Computer Science</p>
              <p className="text-purple-700">Year: Junior (3rd Year)</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-2 flex items-center">
                <Book className="w-5 h-5 mr-2" />
                Current Courses
              </h2>
              <ul className="list-disc list-inside text-purple-700">
                <li>Advanced Algorithms</li>
                <li>Database Systems</li>
                <li>Web Development</li>
                <li>Artificial Intelligence</li>
              </ul>
            </div>
            
          </div>
        </div>
        <div className="bg-purple-50 p-6 mt-6 rounded-lg shadow-md">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm text-purple-700">Last Updated: Sep 15, 2024</span>
            </div>
            <button
            className="min-w-[25%]  bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 shadow-md duration-300 ease-in-out transition-all transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
          >
            Edit Profile
            <PencilIcon className="ml-2 h-4 w-4" />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
