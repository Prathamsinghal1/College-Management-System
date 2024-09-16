import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, GraduationCap, Calendar } from "lucide-react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [optionClick, setOptionClick] = useState("overview");

  const stats = [
    {
      id: 1,
      name: "Total Students",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      number: "1,234",
      increase: "+10% from last month",
    },
    {
      id: 2,
      name: "Active Courses",
      icon: <BookOpen className="h-5 w-5 text-purple-600" />,
      number: "56",
      increase: "+3 new this semester",
    },
    {
      id: 3,
      name: "Faculty Members",
      icon: <GraduationCap className="h-5 w-5 text-purple-600" />,
      number: "89",
      increase: "2 new hires this month",
    },
    {
      id: 4,
      name: "Upcoming Events",
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
      number: "7",
      increase: "Next 7 days",
    },
  ];

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);

  const recentActivities = [
    { id: 1, type: "enrollment", content: "New student enrollment: John Doe" },
    { id: 2, type: "course", content: "Course update: Introduction to Computer Science" },
    { id: 3, type: "faculty", content: "Faculty meeting scheduled for next week" },
    { id: 4, type: "research", content: "New research grant approved" },
    { id: 5, type: "event", content: "Annual college fair next month" },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4 w-full min-h-screen">
      <div className="bg-white rounded-3xl overflow-hidden w-full min-h-[94vh] flex items-center justify-center">
        <div className="bg-gray-100 md:p-12 p-4 w-full">
          {/* Dashboard Header */}
          <div className="pb-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-5 pb-5">
              <h1 className="lg:text-5xl text-4xl font-extrabold text-purple-600">Dashboard</h1>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {stats.map((item) => (
                <div key={item.id} className="max-w-[400px] border border-gray-300 rounded-[8px] p-4 bg-white shadow-xl">
                  <div className="flex items-center justify-between pb-2">
                    <h1 className="font-medium text-gray-600">{item.name}</h1>
                    <div className="p-2 bg-gray-100 rounded-[8px]">{item.icon}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">{item.number}</div>
                    <p className="text-sm text-gray-500">{item.increase}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs: Overview, Recent Activities, Quick Actions */}
            <div className="mt-8">
              <div className="space-y-4">
                {/* Tab Buttons */}
                <div className="flex gap-3 text-[hsl(0,0%,40%)]">
                  <h3
                    className={`bg-[hsl(0,0%,93%)] px-2 py-1 rounded-[8px] font-semibold md:text-sm text-xs cursor-pointer ${
                      optionClick === "overview" ? "text-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setOptionClick("overview")}
                  >
                    Overview
                  </h3>
                  <h3
                    className={`bg-[hsl(0,0%,93%)] px-2 py-1 rounded-[8px] font-semibold md:text-sm text-xs cursor-pointer ${
                      optionClick === "recentActivities" ? "text-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setOptionClick("recentActivities")}
                  >
                    Recent Activities
                  </h3>
                  {isLoggedIn && role !== "student" &&
                  <h3 className={`bg-[hsl(0,0%,93%)] px-2 py-1 rounded-[8px] font-semibold md:text-sm text-xs cursor-pointer ${
                      optionClick === "quickActions" ? "text-purple-600" : "text-gray-600"
                    }`}
                    onClick={() => setOptionClick("quickActions")}
                  >
                    Quick Actions
                  </h3>}
                </div>

                {/* Tab Content */}
                <div className="relative md:pr-16">
                  <div
                    className={`bg-white h-[50px] w-[50px] rotate-[45deg] shadow-xl absolute border-l border-t rounded-[30%] top-0 transition-all duration-300 ${
                      optionClick === "overview"
                        ? "left-[12px]"
                        : optionClick === "recentActivities"
                        ? "left-[90px] md:left-[120px]"
                        : "md:left-[240px] left-[190px]"
                    }`}
                  ></div>

                  <div className="border-x border-b border-gray-300 shadow-xl p-10 bg-white rounded-[14px] top-[20px] relative">
                    {/* Overview Tab */}
                    {optionClick === "overview" && (
                      <section>
                        <h1 className="md:text-3xl text-2xl font-bold mb-4 text-[hsl(0,0%,40%)]">College Overview</h1>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[hsl(0,0%,40%)]">Enrollment Status</h3>
                            <p className="text-sm text-[hsl(0,0%,50%)]">
                              Current semester enrollment is at 95% capacity. Applications for the next semester are now open.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-[hsl(0,0%,40%)]">Academic Performance</h3>
                            <p className="text-sm text-[hsl(0,0%,50%)]">
                              Overall GPA has improved by 0.2 points compared to the previous semester. Science and Engineering departments show the highest improvement.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-[hsl(0,0%,40%)]">Campus Updates</h3>
                            <p className="text-sm text-[hsl(0,0%,50%)]">
                              The new library wing construction is 75% complete. Expected to be operational by next semester.
                            </p>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Recent Activities Tab */}
                    {optionClick === "recentActivities" && (
                      <section>
                        <h1 className="md:text-3xl text-2xl font-bold mb-4 text-[hsl(0,0%,40%)]">Recent Activities</h1>
                        <ul className="space-y-4 text-[hsl(0,0%,50%)] font-medium">
                          {recentActivities.map((activity) => (
                            <li key={activity.id} className="flex items-center">
                              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                              <span className="text-sm">{activity.content}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Quick Actions Tab */}
                    {optionClick === "quickActions" && (
                      <section className="pb-8">
                        <h1 className="md:text-3xl text-2xl font-bold mb-4 text-[hsl(0,0%,40%)]">Quick Actions</h1>
                        
                        <div className="grid grid-cols-2 lg:gap-x-[40%] md:gap-[30%] gap-[10%]">
                          <Link to="/student/add-student">
                            <button
                              className="w-[75%] mt-6 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 lg:py-5 lg:px-10 md:rounded-[30px] rounded-[8px] lg:font-bold flex items-center justify-center"
                            >
                              Add Student
                            </button>          
                          </Link>
                          <Link to="/course/add-course">
                          <button
                              className="w-[75%] mt-6 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 lg:py-5 lg:px-10 md:rounded-[30px] rounded-[8px] lg:font-bold flex items-center justify-center"
                            >
                              Add Course
                            </button>
                            
                          </Link>
                          { role === "admin" && <Link to="/faculty/add-faculty">
                          <button
                              className="w-[75%] mt-6 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 lg:py-5 lg:px-10 md:rounded-[30px] rounded-[8px] lg:font-bold flex items-center justify-center"
                            >
                              Add Faculty
                            </button>
                          </Link>}
                          
                        </div>  
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}