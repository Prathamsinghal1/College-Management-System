import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4 w-full min-h-screen">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full min-h-[94vh] flex items-center justify-center">
        <div className="flex flex-col md:flex-row p-8">
          <div className="md:w-1/2 p-5 flex items-center justify-center">
            <img
              src="./Images/home.png"
              alt="College Management System"
              className="rounded-[10px]"
            />
          </div>
          <div className="md:w-1/2 px-14 py-10 flex flex-col justify-center ">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-purple-600">College Management</span>
              <span className="text-[hsl(0,0%,40%)]"> System</span>
            </h1>
            <h2 className="text-2xl text-[hsl(0,0%,40%)] font-medium mb-4">Streamline Your Institution</h2>
            <p className="text-[hsl(0,0%,50%)] mb-6">
              Our comprehensive College Management System excels in both administrative and academic processes, 
              ensuring efficient, scalable, and user-friendly solutions. We're passionate about transforming 
              educational management through innovative technology and intuitive design.
            </p>
            <Link to="/dashboard" className="w-[75%] mt-6 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
          >
            Explore Features
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}