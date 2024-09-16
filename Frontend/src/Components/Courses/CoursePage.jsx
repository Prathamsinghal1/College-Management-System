import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Users,
  Clock,
  Pencil,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useSelector } from "react-redux";

// Mock data for courses
const coursesData = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    credits: 3,
    enrollment: 120,
    schedule: "MWF 10:00-11:00",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    credits: 4,
    enrollment: 80,
    schedule: "TTH 13:00-15:00",
  },
  {
    id: 3,
    code: "PHYS101",
    name: "Physics for Scientists and Engineers",
    department: "Physics",
    credits: 4,
    enrollment: 100,
    schedule: "MWF 09:00-10:30",
  },
  {
    id: 4,
    code: "CHEM110",
    name: "General Chemistry",
    department: "Chemistry",
    credits: 3,
    enrollment: 90,
    schedule: "TTH 10:00-11:30",
  },
  {
    id: 5,
    code: "BIO150",
    name: "Introduction to Biology",
    department: "Biology",
    credits: 3,
    enrollment: 110,
    schedule: "MWF 14:00-15:00",
  },
];

const sortOptions = {
  NONE: "none",
  ASC: "asc",
  DESC: "desc",
};

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "code",
    direction: sortOptions.NONE,
  });
  const navigate = useNavigate();

  // Function to handle sorting
  const sortedCourses = () => {
    let sortableCourses = [...coursesData];
    if (sortConfig.direction !== sortOptions.NONE) {
      sortableCourses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === sortOptions.ASC ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === sortOptions.ASC ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCourses;
  };

  // Function to handle column header click for sorting
  const requestSort = (key) => {
    let direction = sortOptions.ASC;
    if (sortConfig.key === key && sortConfig.direction === sortOptions.ASC) {
      direction = sortOptions.DESC;
    }
    setSortConfig({ key, direction });
  };

  const filteredCourses = sortedCourses().filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8 lg:pr-16">
      <div className="lg:mr-16">
        <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex md:flex-row flex-col items-center justify-between mb-4">
            <h1 className="lg:text-5xl text-4xl font-extrabold text-purple-700 lg:ml-10 my-5">Courses</h1>
            {role !== "student" && <Link
              to="/course/add-course"
              className="bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Course
            </Link>}
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 mt-1 block border border-gray-300 rounded-lg border-2 border-gray-300 rounded-[30px] outline-none focus:border-purple-500 text-[hsl(0,0%,40%)]"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)]"
              size={18}
            />
          </div>

          <div className="overflow-hidden border rounded-md overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th
                    onClick={() => requestSort("code")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Code{" "}
                    {sortConfig.key === "code" &&
                      (sortConfig.direction === sortOptions.ASC ? (
                        <ChevronUp className="inline h-4 w-4 text-purple-600" />
                      ) : (
                        <ChevronDown className="inline h-4 w-4 text-purple-600" />
                      ))}
                  </th>
                  <th
                    onClick={() => requestSort("name")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Name
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === sortOptions.ASC ? (
                        <ChevronUp className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ))}
                  </th>
                  <th
                    onClick={() => requestSort("department")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Department
                    {sortConfig.key === "department" &&
                      (sortConfig.direction === sortOptions.ASC ? (
                        <ChevronUp className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ))}
                  </th>
                  <th
                    onClick={() => requestSort("credits")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)] text-center"
                  >
                    Credits
                    {sortConfig.key === "credits" &&
                      (sortConfig.direction === sortOptions.ASC ? (
                        <ChevronUp className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ))}
                  </th>
                  <th
                    onClick={() => requestSort("enrollment")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)] text-center"
                  >
                    Enrollment
                    {sortConfig.key === "enrollment" &&
                      (sortConfig.direction === sortOptions.ASC ? (
                        <ChevronUp className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ))}
                  </th>
                  <th
                    onClick={() => requestSort("schedule")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Schedule
                    {sortConfig.key === "schedule" &&
                      (sortConfig.direction === sortOptions.ASC ? (
                        <ChevronUp className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4 text-purple-600 inline" />
                      ))}
                  </th>
                  {role !== "student" && <th className="p-4 text-[hsl(0,0%,40%)] text-right">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-purple-50 transition-colors text-hsl(0,0%,50%)"
                  >
                    <td className="p-4 font-medium">{course.code}</td>
                    <td className="p-4">{course.name}</td>
                    <td className="p-4">{course.department}</td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-sm whitespace-nowrap">
                        {course.credits} credits
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Users className="h-4 w-4 text-[hsl(0,0%,40%)]" />
                        <span>{course.enrollment}</span>
                      </div>
                    </td>
                    <td className="p-4">{course.schedule}</td>
                    {role !== "student" && <td className="p-4 text-right">
                      <button className="bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center">
                        <Pencil size={16} />
                      </button>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
