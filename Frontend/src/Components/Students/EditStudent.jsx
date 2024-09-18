import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft } from 'lucide-react';
import { GrUpdate } from 'react-icons/gr';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    yearOfStudy: '',
    selectedCourses: [],
  });
  const [courseOptions, setCourseOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/students/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const student = response.data;
        setFormState({
          name: student.name,
          email: student.email,
          yearOfStudy: student.yearOfStudy,
          selectedCourses: student.courses.map(course => course._id),
        });
      } catch (error) {
        console.error('Error fetching student:', error);
        setError('Error fetching student details');
        toast.error('Failed to load student details');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:1000/courses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCourseOptions(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses');
      }
    };

    fetchStudent();
    fetchCourses();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      selectedCourses: prevState.selectedCourses.includes(courseId)
        ? prevState.selectedCourses.filter(id => id !== courseId)
        : [...prevState.selectedCourses, courseId],
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating student with data:", { ...formState, courses: formState.selectedCourses });
  
      await axios.put(
        `http://localhost:1000/students/${id}`,
        { ...formState, courses: formState.selectedCourses },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      toast.success('Student updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      setTimeout(() => navigate('/student'), 3000);
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error(`Error updating student: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  

  if (isLoading) return <div>Loading...</div>;

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

          <h2 className="text-3xl font-bold text-purple-700">Edit Student</h2>
        </div>

        <form className="space-y-6" onSubmit={handleUpdate} >
          <div className="">
            <label htmlFor="name" className="text-sm font-medium text-[hsl(0,0%,40%)]">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter student's full name"
            />
          </div>
          <div className="">
          <label htmlFor="email" className="text-sm font-medium text-[hsl(0,0%,40%)]">Email Address</label>
          <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter student's email address"
            />
          </div>
          <div className="">
            <label htmlFor="yearOfStudy" className="text-sm font-medium text-[hsl(0,0%,40%)]">Year of Study</label>
            <select 
                id="yearOfStudy"
                name="yearOfStudy"
                type="text"
                value={formState.yearOfStudy}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              >
                <option value="" disabled>Select year of study</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>
          </div>
          <div className="">
            <label htmlFor="courses" className="text-sm font-medium text-[hsl(0,0%,40%)]">Courses</label>
            <div className="mt-1 space-y-2">
              {courseOptions.map((course,index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={`course-${course._id}`}
                    type="checkbox"
                    value={course._id}
                    checked={formState.selectedCourses.includes(course._id)}
                    onChange={handleCourseChange}
                    className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={`course-${course._id}`} className="ml-2 text-sm font-medium text-[hsl(0,0%,40%)]">
                    {course.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className="w-[70%] my-2 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
              disabled={isLoading}
            >
              <GrUpdate className="mr-2 h-4 w-4" /> Update Course
            </button>
          </div>
        </form>
        </div>
    </div>
  );
};

export default EditStudent;
