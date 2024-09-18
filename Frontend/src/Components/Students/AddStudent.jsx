import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddStudent() {
  const name = useRef('');
  const email = useRef('');
  const yearOfStudy = useRef('');
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:1000/courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error("Failed to load courses", {
          position: "top-right",
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
    fetchCourses();
  }, []);

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setSelectedCourses((prev) =>
      prev.includes(value)
        ? prev.filter((course) => course !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (
      name.current.value === '' ||
      email.current.value === '' ||
      selectedCourses.length === 0 ||
      yearOfStudy.current.value === ''
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
      const response = await axios.post('http://localhost:1000/students/add', {
        name: name.current.value,
        email: email.current.value,
        courses: selectedCourses,
        yearOfStudy: yearOfStudy.current.value,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
  
      if (response.status === 201) {
        toast.success('Student added successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => navigate("/student"), 3000);
  
        // Reset form fields
        name.current.value = '';
        email.current.value = '';
        setSelectedCourses([]);
        yearOfStudy.current.value = '';
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (error) {
      console.error('Error adding student:', error.response?.data || error.message); // Improved error handling
      toast.error(`Error adding student: ${error.response?.data?.message || error.message}`, {
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
            onClick={() => navigate('/student')}
            className="text-purple-600 hover:text-purple-800 transition-colors flex items-center font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Students
          </button>
          <h2 className="text-3xl font-bold text-purple-700">Add New Student</h2>
        </div>
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-[hsl(0,0%,40%)]">Full Name</label>
              <input
                id="name"
                type="text"
                ref={name}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
                placeholder="Enter student's full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-[hsl(0,0%,40%)]">Email Address</label>
              <input
                id="email"
                type="email"
                ref={email}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
                placeholder="Enter student's email address"
              />
            </div>
            <div>
              <label htmlFor="courses" className="text-sm font-medium text-[hsl(0,0%,40%)]">Courses</label>
              <div className="mt-1 space-y-2">
                {courses.map((course) => (
                  <div key={course._id} className="flex items-center">
                    <input
                      id={`course-${course._id}`}
                      type="checkbox"
                      value={course._id}
                      checked={selectedCourses.includes(course._id)}
                      onChange={handleCourseChange}
                      className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={`course-${course._id}`} className="ml-2 text-sm text-[hsl(0,0%,40%)]">
                      {course.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="yearOfStudy" className="text-sm font-medium text-[hsl(0,0%,40%)]">Year of Study</label>
              <select 
                id="yearOfStudy"
                ref={yearOfStudy}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              >
                <option value="" disabled>Select year of study</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>
            </div>
            <div className='flex justify-center '>                
                <button
                    type="submit"
                    className="w-[75%] my-2 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
                    disabled={isLoading}
                >
                    <UserPlus className="mr-2 h-4 w-4" /> {isLoading ? 'Adding...' : 'Add Student'}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
