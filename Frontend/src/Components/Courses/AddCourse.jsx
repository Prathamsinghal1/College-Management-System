import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft } from "lucide-react";
import { BsFolderPlus } from "react-icons/bs";
import axios from 'axios'; // Add axios import

// Mock departments for the dropdown
const departments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
];

export default function AddCoursePage() {
  const [course, setCourse] = useState({
    code: "",
    name: "",
    department: departments[0],
    credits: "",
    enrollment: "",
    schedule: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Define isLoading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      course.name === '' ||
      course.department === '' ||
      course.code === '' ||
      course.credits === '' ||
      course.enrollment === '' ||
      course.schedule === ''
    ) {
      toast.error('All fields are required!', {
        position: 'top-right',
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
      const response = await axios.post('http://localhost:1000/courses', course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status === 201) {
        toast.success('Course added successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate("/course"), 3000); // Change to "/courses"
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (error) {
      toast.error(`Error adding course: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8">
      <ToastContainer />
      <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/course")} // Change to "/courses"
            className="text-purple-600 hover:text-purple-800 transition-colors flex items-center font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </button>
          <h1 className="text-3xl font-bold text-purple-700">Add Course</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="code" className="text-sm font-medium text-[hsl(0,0%,40%)]">Course Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={course.code}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter Course Code"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-[hsl(0,0%,40%)]">Course Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={course.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter Course Name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="department" className="text-sm font-medium text-[hsl(0,0%,40%)]">Department</label>
            <select
              id="department"
              name="department"
              value={course.department}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="credits" className="text-sm font-medium text-[hsl(0,0%,40%)]">Credits</label>
            <input
              type="text"
              id="credits"
              name="credits"
              value={course.credits}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter Credits"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="enrollment" className="text-sm font-medium text-[hsl(0,0%,40%)]">Enrollment</label>
            <input
              type="text"
              id="enrollment"
              name="enrollment"
              value={course.enrollment}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter Enrollment"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="schedule" className="text-sm font-medium text-[hsl(0,0%,40%)]">Schedule</label>
            <input
              type="text"
              id="schedule"
              name="schedule"
              value={course.schedule}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter Schedule"
            />
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className="w-[75%] my-2 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
              disabled={isLoading} // Disable button when loading
            >
              <BsFolderPlus className="mr-2 h-4 w-4" /> Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
